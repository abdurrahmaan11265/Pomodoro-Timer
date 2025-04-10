"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 rounded-full p-3 shadow-lg"
                    size="icon"
                >
                    <ArrowUp className="h-5 w-5" />
                </Button>
            )}
        </>
    );
}; 