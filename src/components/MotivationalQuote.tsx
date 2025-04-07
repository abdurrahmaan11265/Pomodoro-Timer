"use client";

import { useState, useEffect } from "react";

interface Quote {
    text: string;
    author: string;
}

const fallbackQuotes: Quote[] = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" }
];

export const MotivationalQuote = () => {
    const [quote, setQuote] = useState<Quote>({
        text: "Loading...",
        author: "",
    });
    const [loading, setLoading] = useState(true);
    const [lastQuoteIndex, setLastQuoteIndex] = useState(-1);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const timestamp = new Date().getTime();
                const response = await fetch(`https://zenquotes.io/api/random?t=${timestamp}`);
                const data = await response.json();

                if (data && data.length > 0 && data[0].q && data[0].a) {
                    setQuote({
                        text: data[0].q,
                        author: data[0].a,
                    });
                } else {
                    useFallbackQuote();
                }
            } catch (error) {
                useFallbackQuote();
            } finally {
                setLoading(false);
            }
        };

        const useFallbackQuote = () => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
            } while (randomIndex === lastQuoteIndex && fallbackQuotes.length > 1);

            setLastQuoteIndex(randomIndex);
            setQuote(fallbackQuotes[randomIndex]);
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