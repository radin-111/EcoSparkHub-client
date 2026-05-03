
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Send, CheckSquare, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { fadeInUpVariant, staggerContainerVariant } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";
import { scrollFadeInUp } from "@/lib/animations";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      label: "Submit Idea",
      description: "Share your vision with our community.",
      icon: <Send className="w-6 h-6 text-emerald-600" />,
      color: "from-blue-400 to-cyan-500"
    },
    {
      label: "Admin Review",
      description: "Our team ensures quality and feasibility.",
      icon: <CheckSquare className="w-6 h-6 text-emerald-600" />,
      color: "from-purple-400 to-pink-500"
    },
    {
      label: "Community Voting",
      description: "The best ideas rise to the top through votes.",
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      color: "from-green-400 to-emerald-500"
    },
    {
      label: "Get Reviews",
      description: "Receive professional feedback and ratings.",
      icon: <Star className="w-6 h-6 text-emerald-600" />,
      color: "from-yellow-400 to-orange-500"
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      scrollFadeInUp(sectionRef.current, 'top 85%');
    }
  }, []);

  return (
    <ScrollAnimation animation="fadeInUp" className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-white dark:from-gray-900 dark:via-emerald-900 dark:to-background">
      {/* Animated Central Gradient Core */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-100/40 dark:bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" 
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
            className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-slate-100 mb-6"
          >
            How It Works
          </motion.h2>
          <motion.p 
            variants={fadeInUpVariant}
            className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            From innovative ideas to real-world impact, our platform connects eco-conscious minds to drive sustainable change.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariant}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Animated connecting line for desktop */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" as const }}
            className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-slate-200 via-emerald-200 to-slate-200 -translate-y-1/2 z-0 origin-left"
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUpVariant}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" as const }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${
                activeStep === i ? 'ring-2 ring-emerald-400 border-emerald-300' : ''
              }`}>
                <CardContent className="p-8">
                  {/* Animated Step Number Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      type: "spring" as const, 
                      stiffness: 200,
                      delay: i * 0.1 + 0.2
                    }}
                    className="absolute top-4 right-4 text-slate-200 font-black text-4xl group-hover:text-emerald-100 transition-colors"
                  >
                    0{i + 1}
                  </motion.div>

                  {/* Animated Icon Container */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      type: "spring" as const, 
                      stiffness: 200,
                      delay: i * 0.1 + 0.3
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <div className="text-white">{step.icon}</div>
                  </motion.div>

                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
                    className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300"
                  >
                    {step.label}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                    className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6"
                  >
                    {step.description}
                  </motion.p>
                </CardContent>

                {/* Progress Indicator */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: activeStep === i ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-0 left-0 w-full bg-gradient-to-r ${step.color} origin-bottom`}
                />

                {/* Hover Gradient Overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} pointer-events-none`}
                />

                {/* Connection Dots */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.6, duration: 0.5 }}
                    className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-emerald-300 rounded-full z-10"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    />
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollAnimation>
  );
}
