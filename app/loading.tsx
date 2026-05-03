"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Leaf, Sprout, Trees } from "lucide-react";

interface LoaderProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function Loader({ size = 120, className, showText = true }: LoaderProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full blur-3xl"
      />

      {/* Main Loader Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <div
          className={cn("relative flex items-center justify-center", className)}
          style={{ width: size, height: size }}
        >
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-green-500"
          />

          {/* Middle Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-3 border-transparent border-t-blue-500 border-b-cyan-500"
          />

          {/* Inner Gradient Circle */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-400 via-green-500 to-blue-600 opacity-80 blur-sm"
          />

          {/* Center Core */}
          <motion.div
            animate={{ scale: [1, 0.9, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-6 rounded-full bg-background shadow-lg flex items-center justify-center"
          >
            {/* Eco Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -left-2"
              >
                <Leaf className="w-4 h-4 text-emerald-500" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="absolute -top-2 -right-2"
              >
                <Sprout className="w-4 h-4 text-green-500" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
              >
                <Trees className="w-4 h-4 text-blue-500" />
              </motion.div>
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Glow Effect */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 to-blue-500/30 blur-2xl"
          />
        </div>

        {/* Loading Text */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <motion.h2
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent"
            >
              Growing Your Ideas
            </motion.h2>
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="text-muted-foreground mt-2"
            >
              Planting seeds of innovation...
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
