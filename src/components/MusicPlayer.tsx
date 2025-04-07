"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Music, Repeat } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const musicTracks = [
    { title: "Moon Beat Lofi", file: "/music/moon-beat-lofi-312711.mp3" },
    { title: "Watr Fluid", file: "/music/watr-fluid-10149.mp3" },
    { title: "Cozy Lofi Beat", file: "/music/cozy-lofi-beat-split-memmories-248205.mp3" },
    { title: "Walking Dreaming", file: "/music/walking-dreaming-chill-lofi-317143.mp3" },
    { title: "Lofi Girl", file: "/music/lofi-girl-309226.mp3" },
    { title: "Lofi Hip Hop", file: "/music/lofi-music-hip-hop-295207.mp3" },
];

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLooping, setIsLooping] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        audioRef.current = new Audio(musicTracks[currentTrackIndex].file);
        audioRef.current.volume = 0.5; 
        audioRef.current.loop = isLooping;

        const handleEnded = () => {
            if (!isLooping) {
                playNextTrack();
            }
        };

        audioRef.current.addEventListener("ended", handleEnded);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("ended", handleEnded);
                audioRef.current.pause();
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = musicTracks[currentTrackIndex].file;
            audioRef.current.loop = isLooping;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrackIndex, isLooping]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isExpanded &&
                playerRef.current &&
                !playerRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isExpanded]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const playNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicTracks.length);
    };

    const playPreviousTrack = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex === 0 ? musicTracks.length - 1 : prevIndex - 1
        );
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
        if (audioRef.current) {
            audioRef.current.loop = !isLooping;
        }
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleExpanded}
                className="relative"
                ref={buttonRef}
            >
                <Music className="h-5 w-5" />
                {isPlaying && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
            </Button>

            {isExpanded && (
                <div
                    ref={playerRef}
                    className="absolute right-0 mt-2 w-64 bg-card rounded-md shadow-lg p-3 z-50"
                >
                    <div className="text-sm font-medium mb-2 truncate">
                        {musicTracks[currentTrackIndex].title}
                    </div>
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={playPreviousTrack}
                            className="h-8 w-8"
                        >
                            <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={togglePlay}
                            className="h-8 w-8"
                        >
                            {isPlaying ? (
                                <Pause className="h-4 w-4" />
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={playNextTrack}
                            className="h-8 w-8"
                        >
                            <SkipForward className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <Button
                            variant={isLooping ? "default" : "ghost"}
                            size="icon"
                            onClick={toggleLoop}
                            className="h-8 w-8"
                        >
                            <Repeat className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="mt-2 space-y-1">
                        {musicTracks.map((track, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "w-full text-left px-2 py-1 text-xs rounded-sm transition-colors",
                                    currentTrackIndex === index
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                )}
                                onClick={() => {
                                    setCurrentTrackIndex(index);
                                    if (!isPlaying) {
                                        togglePlay();
                                    }
                                }}
                            >
                                {track.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 