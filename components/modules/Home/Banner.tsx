
"use client";

import banner from "@/assets/banner.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { scrollFadeInUp } from "@/lib/animations";

export default function Banner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current) {
      scrollFadeInUp(bannerRef.current, 'top 90%');
    }
  }, []);

  return (
    <motion.div
      ref={bannerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" as const }}
      className="w-full overflow-hidden rounded-2xl shadow-2xl"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="relative"
      >
        <Image 
          src={banner} 
          alt="banner" 
          className="w-full h-auto object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </motion.div>
  );
}
