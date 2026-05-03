"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { fadeInUpVariant, staggerContainerVariant } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";
import { scrollFadeInUp } from "@/lib/animations";

export function SubmitCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      scrollFadeInUp(sectionRef.current, "top 85%");
    }
  }, []);

  return (
    <ScrollAnimation animation="fadeInUp" className="relative py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-green-100 to-white dark:from-gray-900 dark:via-emerald-900 dark:to-background">
      {/* Animated Central Gradient Core */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-100/40 dark:bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" 
      />

      <div ref={sectionRef} className="container relative z-10 mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariant}
          className="text-center"
        >
          <motion.h2 
            variants={fadeInUpVariant}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-800 dark:from-emerald-600 to-green-600 dark:to-emerald-400 bg-clip-text text-transparent mb-6"
          >
            Submit Your Eco-Idea
          </motion.h2>
          <motion.p 
            variants={fadeInUpVariant}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed mb-12"
          >
            Have an innovative eco-friendly concept? Share it with our community and make a real impact on the environment.
          </motion.p>

          <motion.div
            variants={fadeInUpVariant}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Button
                size="lg"
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-emerald-200 dark:border-emerald-700 rounded-3xl shadow-2xl hover:shadow-[0_25px_50px_rgba(16,_185,_129,_0.25)] dark:hover:shadow-[0_25px_50px_rgba(16,_185,_129,_0.4)] transition-all duration-500 overflow-hidden"
              >
                {/* Enhanced Shimmer Effect */}
                <motion.div
                  animate={{
                    x: isHovered ? "250%" : "-100%",
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" as const }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[20deg]"
                />

                {/* Particle Effects */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: 3 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          scale: 0,
                          x: "50%",
                          y: "50%",
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          x: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 100}%`,
                          y: `${50 + Math.sin((i * 60 * Math.PI) / 180) * 100}%`,
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          ease: "easeOut" as const,
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full"
                      />
                    ))}
                  </motion.div>
                )}

                <span className="relative flex items-center gap-2 text-base font-semibold">
                  Submit Idea{" "}
                  <motion.div
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" as const }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>

            {/* Optional secondary button */}
            <motion.button
              variants={fadeInUpVariant}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-500 dark:text-slate-400 text-sm mb-6"
            >
              View Guidelines
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      {/* Animated Subtle Noise Texture Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.03, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
      />
    </ScrollAnimation>
  );
}
