"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface TaskFormProps {
    onSubmit: (task: {
        title: string;
        description: string;
        dueDate: string;
        priority: "low" | "medium" | "high";
        completed: boolean;
    }) => void;
    onCancel: () => void;
    initialData?: {
        title: string;
        description: string;
        dueDate: string;
        priority: "low" | "medium" | "high";
    };
}

export const TaskForm = ({ onSubmit, onCancel, initialData }: TaskFormProps) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
    const [priority, setPriority] = useState<"low" | "medium" | "high">(
        initialData?.priority || "medium"
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            dueDate,
            priority,
            completed: false,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                />
            </div>

            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                    Due Date
                </label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>

            <div>
                <label htmlFor="priority" className="block text-sm font-medium mb-1">
                    Priority
                </label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">
                    {initialData ? "Update Task" : "Add Task"}
                </Button>
            </div>
        </form>
    );
}; 