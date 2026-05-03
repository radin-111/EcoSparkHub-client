"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { fadeInUpVariant, staggerContainerVariant } from "@/lib/animations";
import { useEffect, useRef } from "react";
import { scrollFadeInUp } from "@/lib/animations";

export function Categories() {
  const categories = [
    { name: "Recycling", icon: "♻️", color: "from-green-400 to-emerald-500" },
    { name: "Solar Energy", icon: "☀️", color: "from-yellow-400 to-orange-500" },
    { name: "Water Conservation", icon: "💧", color: "from-blue-400 to-cyan-500" },
    { name: "Transport", icon: "🚗", color: "from-purple-400 to-pink-500" },
    { name: "Agriculture", icon: "🌾", color: "from-amber-400 to-orange-500" },
    { name: "Waste Management", icon: "🗑️", color: "from-gray-400 to-slate-500" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      scrollFadeInUp(sectionRef.current, 'top 85%');
    }
  }, []);

  return (
    <ScrollAnimation animation="fadeInUp" className="relative py-24 overflow-hidden bg-white">
      {/* Animated Central Professional Gradient Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-50/50 rounded-full blur-[120px] pointer-events-none" 
      />

      <div ref={sectionRef} className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariant}
          className="text-center mb-20"
        >
          <motion.h2 
            variants={fadeInUpVariant}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-4"
          >
            Browse by Topic
          </motion.h2>
          <motion.p 
            variants={fadeInUpVariant}
            className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed"
          >
            Select a specialized category to explore community-driven innovations.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariant}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {categories.map((category, i) => (
            <motion.div
              key={i}
              variants={fadeInUpVariant}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" as const }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="group relative h-40 overflow-hidden border-slate-200/60 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,_185,_129,_0.15)] hover:border-emerald-200 cursor-pointer rounded-[2rem]">
                <CardContent className="h-full p-8 flex flex-col justify-end">
                  {/* Animated Background Ghost Number */}
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    className="absolute top-4 right-6 text-8xl font-black text-slate-50 group-hover:text-emerald-50/50 transition-colors duration-500 pointer-events-none select-none"
                  >
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </motion.span>

                  {/* Floating Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                    className="absolute top-6 left-6 text-3xl"
                  >
                    {category.icon}
                  </motion.div>

                  <div className="relative z-10">
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                      className="text-2xl font-bold text-slate-800 group-hover:text-emerald-900 transition-colors duration-300"
                    >
                      {category.name}
                    </motion.h3>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.5, ease: "easeOut" as const }}
                      className={`h-1 bg-gradient-to-r ${category.color} mt-2 origin-left`}
                    />
                  </div>

                  {/* Animated Glassy Inner Glow Overlay */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-tr ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} 
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollAnimation>
  );
}