'use client';

import { useEffect, useState } from 'react';
import { Eye, TrendingUp } from 'lucide-react';

interface VisitorStats {
    total: number;
    today: number;
}

export default function VisitorCounter() {
    const [stats, setStats] = useState<VisitorStats>({ total: 0, today: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get stats from localStorage
        const storedTotal = localStorage.getItem('visitor_total');
        const storedToday = localStorage.getItem('visitor_today');
        const storedDate = localStorage.getItem('visitor_date');

        const today = new Date().toDateString();
        let total = storedTotal ? parseInt(storedTotal) : 0;
        let todayCount = 0;

        // Reset today's count if it's a new day
        if (storedDate !== today) {
            localStorage.setItem('visitor_date', today);
            localStorage.setItem('visitor_today', '1');
            todayCount = 1;
            total += 1;
            localStorage.setItem('visitor_total', total.toString());
        } else {
            todayCount = storedToday ? parseInt(storedToday) : 0;
            // Check if this is a new visit (hasn't visited in the last hour)
            const lastVisit = localStorage.getItem('visitor_last_visit');
            const now = Date.now();
            if (!lastVisit || now - parseInt(lastVisit) > 3600000) { // 1 hour
                todayCount += 1;
                total += 1;
                localStorage.setItem('visitor_today', todayCount.toString());
                localStorage.setItem('visitor_total', total.toString());
                localStorage.setItem('visitor_last_visit', now.toString());
            }
        }

        setStats({ total, today: todayCount });
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-slate-500">
                <Eye size={16} className="animate-pulse" />
                <span className="text-sm">Loading...</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
                <Eye size={16} />
                <div className="text-sm">
                    <span className="font-bold text-white">{stats.total.toLocaleString()}</span>
                    <span className="ml-1">total visits</span>
                </div>
            </div>
            <div className="text-slate-600">|</div>
            <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <div className="text-sm">
                    <span className="font-bold text-orange-400">{stats.today.toLocaleString()}</span>
                    <span className="ml-1">today</span>
                </div>
            </div>
        </div>
    );
}
