
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Check Environment Variables
        const envCheck = {
            DATABASE_URL: !!process.env.DATABASE_URL,
            AUTH_SECRET: !!process.env.AUTH_SECRET,
            ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
            ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
            NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            NODE_ENV: process.env.NODE_ENV,
        };

        // Check Database Connection
        let dbStatus = 'unknown';
        let productCount = 0;
        try {
            const products = await prisma.product.findMany({ take: 1 });
            dbStatus = 'connected';
            productCount = products.length;
        } catch (e: any) {
            dbStatus = 'error: ' + e.message;
        }

        return NextResponse.json({
            status: 'ok',
            env: envCheck,
            database: {
                status: dbStatus,
                productCount,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
        }, { status: 500 });
    }
}
