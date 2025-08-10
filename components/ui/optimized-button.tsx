import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {MouseEventHandler, ReactNode} from "react";

interface OptimizedButtonProps {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export const OptimizedButton = ({ children = "Start session", onClick, disabled = false } : OptimizedButtonProps) => {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base disabled:cursor-not-allowed disabled:opacity-50"
            whileHover={disabled ? {} : { scale: 1.05 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
            }}
            style={{
                filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))"
            }}
        >
            {/* Shadow layer */}
            <motion.span
                className="absolute top-0 left-0 w-full h-full bg-black/25 rounded-lg will-change-transform"
                initial={{ y: 2 }}
                whileHover={disabled ? {} : { y: 4 }}
                whileTap={disabled ? {} : { y: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 30
                }}
            />

            {/* Base layer */}
            <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-slate-800 via-slate-600 to-slate-800" />

            {/* Main button surface */}
            <motion.div
                className="relative flex items-center justify-center py-3 px-6 text-lg text-white rounded-lg bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 gap-3 will-change-transform select-none"
                initial={{ y: -4 }}
                whileHover={disabled ? {} : {
                    y: -6,
                    filter: "brightness(1.1)"
                }}
                whileTap={disabled ? {} : { y: -2 }}
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 30
                }}
            >
                <span className="select-none">{children}</span>
                <motion.div
                    whileHover={disabled ? {} : { x: 4 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }}
                >
                    <ArrowRight className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </motion.button>
    );
};
