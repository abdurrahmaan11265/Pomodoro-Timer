"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { CircularProgress } from "@/components/CircularProgress";
import { cn } from "@/lib/utils";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">("focus");
    const [cycles, setCycles] = useState(0);
    const [selectedDuration, setSelectedDuration] = useState(25);
    const [isBlinking, setIsBlinking] = useState(false);
    const [previousMode, setPreviousMode] = useState<"focus" | "shortBreak" | "longBreak">("focus");

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

    // Effect to handle blinking when mode changes
    useEffect(() => {
        if (mode !== previousMode) {
            // Play ding sound
            const audio = new Audio("/music/ding.mp3");

            // Start blinking effect
            setIsBlinking(true);
            setPreviousMode(mode);

            // Play the sound and stop blinking when it ends
            audio.play().then(() => {
                // Get the duration of the audio
                const soundDuration = audio.duration * 1000; // Convert to milliseconds

                // Stop blinking after the sound finishes playing
                const blinkTimer = setTimeout(() => {
                    setIsBlinking(false);
                }, soundDuration);

                return () => clearTimeout(blinkTimer);
            }).catch(error => {
                console.error("Failed to play sound:", error);
                // If sound fails to play, stop blinking after a short delay
                setTimeout(() => {
                    setIsBlinking(false);
                }, 1000);
            });
        }
    }, [mode, previousMode]);

    const handleTimerComplete = () => {
        if (mode === "focus") {
            setCycles((prev) => prev + 1);
            if (cycles + 1 >= 4) {
                setMode("longBreak");
                setTimeLeft(15 * 60);
                setCycles(0);
            } else {
                setMode("shortBreak");
                setTimeLeft(5 * 60);
            }
        } else {
            setMode("focus");
            setTimeLeft(selectedDuration * 60);
        }

        const stats = JSON.parse(localStorage.getItem("pomodoroStats") || "{}");
        const today = new Date().toDateString();
        const updatedStats = {
            totalSessions: (stats.totalSessions || 0) + 1,
            todaySessions: (stats.todaySessions || 0) + 1,
            weeklySessions: (stats.weeklySessions || 0) + 1,
            totalFocusTime: (stats.totalFocusTime || 0) + (mode === "focus" ? selectedDuration : 0),
            lastSessionDate: today,
        };
        localStorage.setItem("pomodoroStats", JSON.stringify(updatedStats));
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(selectedDuration * 60);
        setMode("focus");
    };

    const setTimerDuration = (minutes: number) => {
        setSelectedDuration(minutes);
        setTimeLeft(minutes * 60);
        setIsRunning(false);
        setMode("focus");
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const calculateProgress = () => {
        const totalSeconds = selectedDuration * 60;
        return ((totalSeconds - timeLeft) / totalSeconds) * 100;
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-center">Pomodoro Timer</h1>

            <Card className={cn(
                "p-8 transition-all duration-300",
                isBlinking && "animate-pulse bg-primary/30"
            )}>
                <div className="text-center space-y-4">
                    <div className="relative flex items-center justify-center">
                        <CircularProgress
                            progress={calculateProgress()}
                            size={240}
                            strokeWidth={12}
                            className="mx-auto"
                        />
                        <div className="absolute flex flex-col items-center">
                            <div className="text-6xl font-bold">{formatTime(timeLeft)}</div>
                            <div className="text-lg text-muted-foreground">
                                {mode === "focus"
                                    ? "Focus Time"
                                    : mode === "shortBreak"
                                        ? "Short Break"
                                        : "Long Break"}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-2 mb-4">
                        <Button
                            variant={selectedDuration === 5 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimerDuration(5)}
                            disabled={isRunning}
                        >
                            5 min
                        </Button>
                        <Button
                            variant={selectedDuration === 15 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimerDuration(15)}
                            disabled={isRunning}
                        >
                            15 min
                        </Button>
                        <Button
                            variant={selectedDuration === 25 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimerDuration(25)}
                            disabled={isRunning}
                        >
                            25 min
                        </Button>
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

            <Card className={cn(
                "p-6 transition-all duration-300",
                isBlinking && "animate-pulse bg-primary/20"
            )}>
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
                    <div>
                        <p className="text-sm text-muted-foreground">Selected Duration</p>
                        <p className="font-medium">{selectedDuration} minutes</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Timer; 