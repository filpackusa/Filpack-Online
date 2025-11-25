'use server';

import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';


export async function recordVisit(page: string) {
    try {
        const headersList = await headers();
        const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
        const userAgent = headersList.get('user-agent') || 'unknown';


        // Check if this IP visited today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingVisit = await prisma.visit.findFirst({
            where: {
                ip: ip,
                createdAt: {
                    gte: today
                }
            }
        });

        // Only record if IP hasn't visited today
        if (!existingVisit) {
            await prisma.visit.create({
                data: {
                    ip,
                    userAgent,
                    page
                }
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to record visit:', error);
        return { success: false, error: 'Failed to record visit' };
    }
}

export async function getVisitorStats() {
    try {
        // Get total unique visitors
        const totalVisits = await prisma.visit.count();

        // Get today's unique visitors
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayVisits = await prisma.visit.count({
            where: {
                createdAt: {
                    gte: today
                }
            }
        });

        return {
            total: totalVisits,
            today: todayVisits
        };
    } catch (error) {
        console.error('Failed to get visitor stats:', error);
        return {
            total: 0,
            today: 0
        };
    }
}
