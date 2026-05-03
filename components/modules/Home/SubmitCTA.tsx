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
    <ScrollAnimation animation="fadeInUp" className="px-6 py-20 md:px-16">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="relative max-w-6xl mx-auto overflow-hidden rounded-[3rem] border border-emerald-100 bg-white p-8 md:p-20 shadow-2xl shadow-emerald-100/50"
      >
        {/* Animated "Center Glow" Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" as const }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white pointer-events-none"
        />

        {/* Animated Blurry accent Orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" as const }}
          whileHover={{ scale: 1.2 }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/30 rounded-full blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" as const }}
          whileHover={{ scale: 1.2 }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-100/40 rounded-full blur-[100px]"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariant}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Animated Subtle Badge */}
          <motion.div
            variants={fadeInUpVariant}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" as const },
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Community Driven
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUpVariant}
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Ready to share your{" "}
            <motion.span
              whileHover={{
                scale: 1.1,
                color: "#10b981",
              }}
              transition={{ duration: 0.3 }}
              className="text-emerald-600"
            >
              vision?
            </motion.span>
          </motion.h2>

          <motion.p
            variants={fadeInUpVariant}
            className="max-w-xl mx-auto text-lg text-slate-500 leading-relaxed mb-10"
          >
            Join 800+ members in building sustainable solutions. Share your idea
            today and get validation you need to move forward.
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
                className="group relative h-14 px-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 overflow-hidden shadow-xl"
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
              className="px-8 py-3 text-slate-500 font-medium transition-colors"
            >
              View Guidelines
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animated Subtle Noise Texture Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.03, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
        />
      </motion.div>
    </ScrollAnimation>
  );
}
