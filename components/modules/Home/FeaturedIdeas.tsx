"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { fadeInUpVariant, staggerContainerVariant } from "@/lib/animations";
import { useEffect, useRef } from "react";
import { scaleIn } from "@/lib/animations";

export function FeaturedIdeas() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('[data-idea-card]');
      cards.forEach((card, index) => {
        scaleIn(card as HTMLElement, 0.6, index * 0.1);
      });
    }
  }, []);

  const ideas = [
    {
      title: "Solar Community Project",
      description: "Implement solar panels in rural communities to reduce electricity costs and carbon footprint while promoting clean energy.",
      category: "🌞 Solar",
      votes: 120,
      icon: "☀️",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      title: "Ocean Cleanup Initiative",
      description: "Deploy autonomous drones to collect plastic waste from ocean surfaces and prevent marine pollution.",
      category: "🌊 Ocean",
      votes: 98,
      icon: "🌊",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      title: "Urban Forest Project",
      description: "Transform vacant city lots into mini-forests to improve air quality and community spaces.",
      category: "🌳 Forest",
      votes: 156,
      icon: "🌲",
      gradient: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <ScrollAnimation animation="fadeInUp" className="py-24 bg-gradient-to-b from-green-50 via-green-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-background">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariant}
        className="container mx-auto px-6 md:px-20"
      >
        <motion.h2 
          variants={fadeInUpVariant}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-green-800 dark:from-green-600 to-emerald-600 dark:to-emerald-400 bg-clip-text text-transparent mb-16"
        >
          Recent Ideas
        </motion.h2>
        
        <div ref={sectionRef} className="grid md:grid-cols-3 gap-10">
          {ideas.map((idea, index) => (
            <motion.div
              key={index}
              data-idea-card
              variants={fadeInUpVariant}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3, ease: "easeOut" as const }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="group relative h-full rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-green-100 dark:border-green-900/30 overflow-hidden">
                {/* Gradient Accent Line */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${idea.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Floating Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring" as const, 
                    stiffness: 200,
                    delay: index * 0.1 + 0.2
                  }}
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-white dark:from-gray-800 to-gray-100 dark:to-gray-700 shadow-lg flex items-center justify-center text-2xl"
                >
                  {idea.icon}
                </motion.div>

                <CardContent className="p-6 pt-8">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors duration-300"
                  >
                    {idea.title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6"
                  >
                    {idea.description}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="flex justify-between items-center"
                  >
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className={`text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${idea.gradient} text-white shadow-md`}
                    >
                      {idea.category}
                    </motion.span>
                    
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300"
                    >
                      <span className="text-sm">{idea.votes} votes</span>
                    </motion.div>
                  </motion.div>
                </CardContent>

                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${idea.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </ScrollAnimation>
  );
}
