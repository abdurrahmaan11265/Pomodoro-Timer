"use client";

import { useState, useEffect } from "react";

interface Quote {
    text: string;
    author: string;
}

export const MotivationalQuote = () => {
    const [quote, setQuote] = useState<Quote>({
        text: "Loading...",
        author: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch("https://api.quotable.io/random?tags=motivation");
                const data = await response.json();
                setQuote({
                    text: data.content,
                    author: data.author,
                });
            } catch (error) {
                setQuote({
                    text: "The only way to do great work is to love what you do.",
                    author: "Steve Jobs",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
        );
    }

    return (
        <blockquote className="border-l-4 border-primary pl-4">
            <p className="text-lg italic mb-2">"{quote.text}"</p>
            <footer className="text-sm text-muted-foreground">— {quote.author}</footer>
        </blockquote>
    );
}; 