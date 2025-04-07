"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node) &&
                hamburgerButtonRef.current &&
                !hamburgerButtonRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: "Dashboard", path: "/" },
        { name: "Timer", path: "/timer" },
        { name: "Tasks", path: "/tasks" },
        { name: "Statistics", path: "/statistics" },
    ];

    return (
        <nav className="border-b relative z-50 bg-card shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="text-xl font-bold">
                            Study Planner
                        </Link>
                        <div className="hidden md:flex space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === item.path
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-md hover:bg-accent"
                            >
                                {theme === "dark" ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            ref={hamburgerButtonRef}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5 transition-transform duration-300 ease-in-out" />
                            ) : (
                                <Menu className="h-5 w-5 transition-transform duration-300 ease-in-out" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className={cn(
                    "md:hidden absolute top-16 left-0 right-0 bg-card border-b shadow-lg transition-all duration-300 ease-in-out",
                    isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                )}
            >
                <div className="space-y-1 px-4 pb-3 pt-2">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "block px-3 py-2 rounded-md text-base font-medium transition-all duration-200",
                                pathname === item.path
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground",
                                isMobileMenuOpen
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-4 opacity-0",
                                `transition-delay-${index * 50}`
                            )}
                            style={{
                                transitionDelay: `${index * 50}ms`,
                                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(1rem)",
                                opacity: isMobileMenuOpen ? 1 : 0
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}; 