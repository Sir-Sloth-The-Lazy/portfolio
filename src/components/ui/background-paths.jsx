"use client";

import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "#components/ui/button";

function FloatingPaths({ position }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    const pathDurations = React.useMemo(() => 
        paths.map(() => 10 + Math.random() * 10),
        []
    );

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path, index) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.1, opacity: 0.8 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.4, 0.8, 0.4],
                            pathOffset: [0, 1],
                        }}
                        transition={{
                            duration: pathDurations[index],
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({ title = "Background Paths" }) {
    const [currentProgress, setCurrentProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [isLifted, setIsLifted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isBootComplete, setIsBootComplete] = useState(false);
    
    const words = title.split(" ");

    const systemMessages = [
        "Initializing kernel...",
        "Starting Darwin subsystem...",
        "Mounting root filesystem...",
        "Loading Python environments...",
        "Initializing LLM parameters...",
        "Compiling Neural Networks...",
        "Optimizing React components...",
        "Loading global design tokens...",
        "Fetching GitHub repositories...",
        "Synchronizing workspace...",
        "Preparing user session...",
        "System Ready.",
    ];

    useEffect(() => {
        let timeoutId;
        
        const updateLoading = () => {
            setCurrentProgress((prev) => {
                if (prev >= 100) return 100;
                
                const increment = Math.floor(Math.random() * 8) + 5; // Faster increments (5-12%)
                const next = Math.min(prev + increment, 100);
                
                const threshold = 100 / (systemMessages.length - 1);
                const nextIndex = Math.min(
                    Math.floor(next / threshold),
                    systemMessages.length - 1
                );
                setMessageIndex(nextIndex);
                
                return next;
            });

            if (currentProgress < 100) {
                const isStalling = Math.random() > 0.95; // Reduced stall frequency
                const nextDelay = isStalling 
                    ? Math.random() * 600 + 300 // Shorter stalls
                    : Math.random() * 150 + 50;  // Snappier standard delay
                
                timeoutId = setTimeout(updateLoading, nextDelay);
            } else {
                setTimeout(() => setIsBootComplete(true), 300); // Faster finish
            }
        };

        // Faster initial start
        timeoutId = setTimeout(updateLoading, 800);

        return () => clearTimeout(timeoutId);
    }, [currentProgress, systemMessages.length]);

    const handleDiscover = () => {
        setIsLifted(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 1200);
    };

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 transition-transform ${
                isLifted ? "-translate-y-full" : "translate-y-0"
            }`}
            style={{
                zIndex: 9999,
                transitionDuration: "1200ms",
                transitionTimingFunction: "cubic-bezier(0.8, 0, 0.2, 1)",
                willChange: "transform",
            }}
        >
            <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white text-black">
                <div className="absolute inset-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>

                <div className="relative z-10 container mx-auto px-4 md:px-6 text-center bg-white/10 backdrop-blur-[2px] rounded-3xl py-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-12 tracking-tighter">
                            {words.map((word, wordIndex) => (
                                <span
                                    key={wordIndex}
                                    className="inline-block mr-4 last:mr-0"
                                >
                                    {word.split("").map((letter, letterIndex) => (
                                        <motion.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 80, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: wordIndex * 0.1 + letterIndex * 0.03,
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 25,
                                            }}
                                            className="inline-block text-transparent bg-clip-text bg-linear-to-r from-neutral-900 to-neutral-500"
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </h1>

                        <div className="flex flex-col items-center space-y-8">
                            {/* Progress Section */}
                            <div className="flex flex-col items-center space-y-4 w-full">
                                <div className="w-[280px] h-1.5 bg-neutral-200 rounded-full overflow-hidden relative shadow-inner">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-neutral-900 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${currentProgress}%` }}
                                    ></div>
                                </div>

                                <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.2em] h-[1.2em] text-center">
                                    {systemMessages[messageIndex]}
                                </div>
                            </div>

                            {/* Discover Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ 
                                    opacity: isBootComplete ? 1 : 0,
                                    scale: isBootComplete ? 1 : 0.9 
                                }}
                                transition={{ duration: 0.5 }}
                                className="pt-4"
                            >
                                {isBootComplete && (
                                    <div className="inline-block group relative bg-neutral-950 p-px rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105">
                                        <Button
                                            variant="ghost"
                                            onClick={handleDiscover}
                                            className="rounded-[1.1rem] px-10 py-7 text-lg font-bold bg-white text-black hover:bg-neutral-50 transition-all duration-300 border border-neutral-100 shadow-xl"
                                        >
                                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                                Enter Workspace
                                            </span>
                                            <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">
                                                →
                                            </span>
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
