"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TaskList } from "@/components/TaskList";
import { PomodoroSummary } from "@/components/PomodoroSummary";
import { MotivationalQuote } from "@/components/MotivationalQuote";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const allTasks = JSON.parse(savedTasks);
      setTasks(allTasks);

      // Filter out completed tasks and sort by due date
      const pendingTasks = allTasks
        .filter((task: Task) => !task.completed)
        .sort((a: Task, b: Task) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

      setUpcomingTasks(pendingTasks);
    }
  }, []);

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Update upcoming tasks
    const pendingTasks = updatedTasks
      .filter((task: Task) => !task.completed)
      .sort((a: Task, b: Task) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    setUpcomingTasks(pendingTasks);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Update upcoming tasks
    const pendingTasks = updatedTasks
      .filter((task: Task) => !task.completed)
      .sort((a: Task, b: Task) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    setUpcomingTasks(pendingTasks);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          <div className="overflow-y-auto max-h-[300px] pr-2">
            {upcomingTasks.length > 0 ? (
              <TaskList
                tasks={upcomingTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                limit={5}
              />
            ) : (
              <p className="text-muted-foreground">No upcoming tasks. Add some tasks to get started!</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Pomodoro Summary</h2>
          <PomodoroSummary />
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Daily Motivation</h2>
        <MotivationalQuote />
      </Card>
    </div>
  );
}
