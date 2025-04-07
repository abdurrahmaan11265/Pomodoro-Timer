"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">("focus");
    const [cycles, setCycles] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimerComplete();
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const handleTimerComplete = () => {
        const audio = new Audio("/notification.mp3");
        audio.play();

        if (mode === "focus") {
            setCycles((prev) => prev + 1);
            if (cycles + 1 >= 4) {
                setMode("longBreak");
                setTimeLeft(15 * 60); // 15 minutes
                setCycles(0);
            } else {
                setMode("shortBreak");
                setTimeLeft(5 * 60); // 5 minutes
            }
        } else {
            setMode("focus");
            setTimeLeft(25 * 60); // 25 minutes
        }

        // Update stats in localStorage
        const stats = JSON.parse(localStorage.getItem("pomodoroStats") || "{}");
        const today = new Date().toDateString();
        const updatedStats = {
            totalSessions: (stats.totalSessions || 0) + 1,
            todaySessions: (stats.todaySessions || 0) + 1,
            weeklySessions: (stats.weeklySessions || 0) + 1,
            totalFocusTime: (stats.totalFocusTime || 0) + (mode === "focus" ? 25 : 0),
            lastSessionDate: today,
        };
        localStorage.setItem("pomodoroStats", JSON.stringify(updatedStats));
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
        setMode("focus");
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-center">Pomodoro Timer</h1>

            <Card className="p-8">
                <div className="text-center space-y-4">
                    <div className="text-6xl font-bold">{formatTime(timeLeft)}</div>
                    <div className="text-lg text-muted-foreground">
                        {mode === "focus"
                            ? "Focus Time"
                            : mode === "shortBreak"
                                ? "Short Break"
                                : "Long Break"}
                    </div>
                    <div className="flex justify-center space-x-4">
                        <Button
                            size="lg"
                            onClick={toggleTimer}
                            variant={isRunning ? "destructive" : "default"}
                        >
                            {isRunning ? (
                                <>
                                    <Pause className="mr-2 h-4 w-4" />
                                    Pause
                                </>
                            ) : (
                                <>
                                    <Play className="mr-2 h-4 w-4" />
                                    Start
                                </>
                            )}
                        </Button>
                        <Button size="lg" variant="outline" onClick={resetTimer}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                        </Button>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Session Info</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Current Mode</p>
                        <p className="font-medium">
                            {mode === "focus"
                                ? "Focus"
                                : mode === "shortBreak"
                                    ? "Short Break"
                                    : "Long Break"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Cycles Completed</p>
                        <p className="font-medium">{cycles}/4</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Timer; 