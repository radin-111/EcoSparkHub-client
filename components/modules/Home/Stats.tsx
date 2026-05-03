"use client";
import CountUp from "react-countup";
import { Users, Lightbulb, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { fadeInUpVariant, staggerContainerVariant } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";
import { scrollFadeInUp } from "@/lib/animations";

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      number: 1200,
      suffix: "+",
      label: "Ideas Shared",
      description: "Innovative concepts from our community.",
      icon: <Lightbulb className="w-5 h-5 text-emerald-600" />,
      color: "from-yellow-400 to-orange-500"
    },
    {
      number: 800,
      suffix: "+",
      label: "Active Members",
      description: "Collaborators working together daily.",
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      color: "from-blue-400 to-cyan-500"
    },
    {
      number: 300,
      suffix: "+",
      label: "Approved Projects",
      description: "Vetted and ready for implementation.",
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
      color: "from-green-400 to-emerald-500"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <ScrollAnimation animation="fadeInUp" className="relative py-24 overflow-hidden bg-white">
      {/* Animated Refined Central Gradient Core */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-100/40 rounded-[100%] blur-[120px] pointer-events-none" 
      />

      <div ref={sectionRef} className="container relative z-10 mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200/50 rounded-3xl overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-200/20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUpVariant}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" as const }
              }}
              className="group relative bg-white/70 backdrop-blur-md p-10 lg:p-14 transition-all duration-500 hover:bg-emerald-50/40"
            >
              <div className="flex flex-col items-center text-center">
                {/* Animated Icon Circle */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring" as const, 
                    stiffness: 200,
                    delay: i * 0.1 + 0.2
                  }}
                  whileHover={{ 
                    rotate: [0, -360, 0],
                    transition: { duration: 0.7, ease: "easeInOut" as const }
                  }}
                  className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} mb-8 shadow-lg`}
                >
                  <div className="text-white">{stat.icon}</div>
                </motion.div>

                {/* Animated Number with Counter */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.4, duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900 mb-2"
                >
                  {isVisible && (
                    <>
                      <CountUp
                        end={stat.number}
                        duration={2.5}
                        separator=","
                        start={0}
                      />
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + 2.5, duration: 0.4 }}
                        className="text-emerald-500"
                      >
                        {stat.suffix}
                      </motion.span>
                    </>
                  )}
                </motion.div>

                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.6, duration: 0.5 }}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-4"
                >
                  {stat.label}
                </motion.span>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.8, duration: 0.5 }}
                  className="text-slate-500 text-sm max-w-[180px] leading-relaxed transition-opacity"
                >
                  {stat.description}
                </motion.p>
              </div>

              {/* Enhanced Decorative hover accent */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" as const }}
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color} origin-center`}
              />
              
              {/* Pulse Effect on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: [0, 0.3, 0],
                  scale: [1, 1.05, 1],
                  transition: { duration: 1, repeat: Infinity }
                }}
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 pointer-events-none rounded-3xl`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollAnimation>
  );
}
