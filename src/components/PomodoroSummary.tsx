"use client";

import { useState, useEffect } from "react";
import { Card } from "./ui/card";

interface PomodoroStats {
    totalSessions: number;
    todaySessions: number;
    weeklySessions: number;
    totalFocusTime: number;
}

export const PomodoroSummary = () => {
    const [stats, setStats] = useState<PomodoroStats>({
        totalSessions: 0,
        todaySessions: 0,
        weeklySessions: 0,
        totalFocusTime: 0,
    });

    useEffect(() => {
        const savedStats = localStorage.getItem("pomodoroStats");
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
    }, []);

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Today's Sessions</h3>
                <p className="text-2xl font-bold">{stats.todaySessions}</p>
            </Card>
            <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Weekly Sessions</h3>
                <p className="text-2xl font-bold">{stats.weeklySessions}</p>
            </Card>
            <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Sessions</h3>
                <p className="text-2xl font-bold">{stats.totalSessions}</p>
            </Card>
            <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Focus Time</h3>
                <p className="text-2xl font-bold">{formatTime(stats.totalFocusTime)}</p>
            </Card>
        </div>
    );
}; 