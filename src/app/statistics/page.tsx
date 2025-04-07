"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface PomodoroStats {
    totalSessions: number;
    todaySessions: number;
    weeklySessions: number;
    totalFocusTime: number;
    lastSessionDate: string;
}

interface TaskStats {
    total: number;
    completed: number;
    pending: number;
    byPriority: {
        high: number;
        medium: number;
        low: number;
    };
}

const StatisticsPage = () => {
    const [pomodoroStats, setPomodoroStats] = useState<PomodoroStats>({
        totalSessions: 0,
        todaySessions: 0,
        weeklySessions: 0,
        totalFocusTime: 0,
        lastSessionDate: "",
    });

    const [taskStats, setTaskStats] = useState<TaskStats>({
        total: 0,
        completed: 0,
        pending: 0,
        byPriority: {
            high: 0,
            medium: 0,
            low: 0,
        },
    });

    useEffect(() => {
        // Load Pomodoro stats
        const savedPomodoroStats = localStorage.getItem("pomodoroStats");
        if (savedPomodoroStats) {
            setPomodoroStats(JSON.parse(savedPomodoroStats));
        }

        // Load Task stats
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            const stats: TaskStats = {
                total: tasks.length,
                completed: tasks.filter((task: any) => task.completed).length,
                pending: tasks.filter((task: any) => !task.completed).length,
                byPriority: {
                    high: tasks.filter((task: any) => task.priority === "high").length,
                    medium: tasks.filter((task: any) => task.priority === "medium").length,
                    low: tasks.filter((task: any) => task.priority === "low").length,
                },
            };
            setTaskStats(stats);
        }
    }, []);

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const taskData = [
        { name: "High", value: taskStats.byPriority.high },
        { name: "Medium", value: taskStats.byPriority.medium },
        { name: "Low", value: taskStats.byPriority.low },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Statistics</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Pomodoro Statistics</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Sessions</p>
                            <p className="text-2xl font-bold">{pomodoroStats.totalSessions}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Today's Sessions</p>
                            <p className="text-2xl font-bold">{pomodoroStats.todaySessions}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Weekly Sessions</p>
                            <p className="text-2xl font-bold">{pomodoroStats.weeklySessions}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Focus Time</p>
                            <p className="text-2xl font-bold">
                                {formatTime(pomodoroStats.totalFocusTime)}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Task Statistics</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Tasks</p>
                            <p className="text-2xl font-bold">{taskStats.total}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Completed Tasks</p>
                            <p className="text-2xl font-bold">{taskStats.completed}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Pending Tasks</p>
                            <p className="text-2xl font-bold">{taskStats.pending}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                            <p className="text-2xl font-bold">
                                {taskStats.total
                                    ? Math.round((taskStats.completed / taskStats.total) * 100)
                                    : 0}
                                %
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Tasks by Priority</h2>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={taskData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default StatisticsPage; 