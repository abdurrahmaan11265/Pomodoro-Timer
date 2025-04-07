"use client";

import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
}

interface TaskListProps {
    tasks?: Task[];
    onToggle?: (taskId: string) => void;
    onDelete?: (taskId: string) => void;
    limit?: number;
}

const TaskList = ({
    tasks = [],
    onToggle = () => { },
    onDelete = () => { },
    limit
}: TaskListProps) => {
    const displayedTasks = limit ? tasks.slice(0, limit) : tasks;

    return (
        <div className="space-y-4">
            {displayedTasks.length === 0 ? (
                <p className="text-muted-foreground">No tasks yet. Add some tasks to get started!</p>
            ) : (
                displayedTasks.map((task) => (
                    <Card key={task.id} className="p-4">
                        <div className="flex items-start space-x-4">
                            <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => onToggle(task.id)}
                            />
                            <div className="flex-1">
                                <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                                    {task.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{task.description}</p>
                                <div className="mt-2 flex items-center space-x-2">
                                    <span className="text-xs text-muted-foreground">
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${task.priority === "high"
                                        ? "bg-red-100 text-red-800"
                                        : task.priority === "medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
};

export default TaskList; 