"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Filter, ArrowUpDown, Calendar } from "lucide-react";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { BackToTop } from "@/components/BackToTop";

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
}

type SortOrder = "asc" | "desc" | "none";

const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
    const [sortOrder, setSortOrder] = useState<SortOrder>("none");
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    const addTask = (task: Omit<Task, "id">) => {
        const newTask = {
            ...task,
            id: Date.now().toString(),
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setShowForm(false);
    };

    const editTask = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const updateTask = (taskData: Omit<Task, "id">) => {
        if (!editingTask) return;

        const updatedTasks = tasks.map((task) =>
            task.id === editingTask.id
                ? { ...taskData, id: task.id, completed: task.completed }
                : task
        );

        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setShowForm(false);
        setEditingTask(null);
    };

    const deleteTask = (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const toggleTask = (taskId: string) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const toggleSortOrder = () => {
        if (sortOrder === "none") {
            setSortOrder("asc");
        } else if (sortOrder === "asc") {
            setSortOrder("desc");
        } else {
            setSortOrder("none");
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "pending") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const sortedAndFilteredTasks = [...filteredTasks].sort((a, b) => {
        if (sortOrder === "none") return 0;

        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();

        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    const handleCancel = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Tasks</h1>
                <Button onClick={() => setShowForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                </Button>
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="flex space-x-2">
                    <Button
                        variant={filter === "all" ? "default" : "outline"}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === "pending" ? "default" : "outline"}
                        onClick={() => setFilter("pending")}
                    >
                        Pending
                    </Button>
                    <Button
                        variant={filter === "completed" ? "default" : "outline"}
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </Button>
                </div>

                <div className="ml-auto">
                    <Button
                        variant="outline"
                        onClick={toggleSortOrder}
                        className="flex items-center"
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        Sort by Due Date
                        {sortOrder !== "none" && (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                        {sortOrder === "asc" && <span className="ml-1">↑</span>}
                        {sortOrder === "desc" && <span className="ml-1">↓</span>}
                    </Button>
                </div>
            </div>

            {showForm && (
                <Card className="p-6">
                    <TaskForm
                        onSubmit={editingTask ? updateTask : addTask}
                        onCancel={handleCancel}
                        initialData={editingTask || undefined}
                    />
                </Card>
            )}

            <TaskList
                tasks={sortedAndFilteredTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
            />

            <BackToTop />
        </div>
    );
};

export default TasksPage; 