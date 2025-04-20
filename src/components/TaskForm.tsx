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
    const [errors, setErrors] = useState({
        title: "",
        dueDate: ""
    });

    const validateForm = () => {
        const newErrors = {
            title: "",
            dueDate: ""
        };

        // Title validation
        if (title.trim().length < 3) {
            newErrors.title = "Title must be at least 3 characters long";
        }

        // Due date validation
        const selectedDate = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

        if (selectedDate < today) {
            newErrors.dueDate = "Due date must be in the future";
        }

        setErrors(newErrors);
        return !newErrors.title && !newErrors.dueDate;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit({
                title,
                description,
                dueDate,
                priority,
                completed: false,
            });
        }
    };

    // Set minimum date for the date input (today)
    const today = new Date().toISOString().split('T')[0];

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
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (errors.title) {
                            setErrors(prev => ({ ...prev, title: "" }));
                        }
                    }}
                    className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : ''}`}
                    required
                    minLength={3}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
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
                    onChange={(e) => {
                        setDueDate(e.target.value);
                        if (errors.dueDate) {
                            setErrors(prev => ({ ...prev, dueDate: "" }));
                        }
                    }}
                    className={`w-full px-3 py-2 border rounded-md ${errors.dueDate ? 'border-red-500' : ''}`}
                    required
                    min={today}
                />
                {errors.dueDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
                )}
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