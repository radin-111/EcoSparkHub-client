"use client";

import Banner from "@/components/modules/Home/Banner";
import { Categories } from "@/components/modules/Home/Categories";
import { FeaturedIdeas } from "@/components/modules/Home/FeaturedIdeas";
import { HowItWorks } from "@/components/modules/Home/HowItWorks";
import { Stats } from "@/components/modules/Home/Stats";
import { SubmitCTA } from "@/components/modules/Home/SubmitCTA";
import { motion } from "framer-motion";
import { staggerContainerVariant, fadeInUpVariant } from "@/lib/animations";

export default function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariant}
      className="min-h-screen"
    >
      <motion.div variants={fadeInUpVariant}>
        <Banner />
      </motion.div>
      
      <motion.div variants={fadeInUpVariant}>
        <FeaturedIdeas />
      </motion.div>
      
      <motion.div variants={fadeInUpVariant}>
        <SubmitCTA />
      </motion.div>
      
      <motion.div variants={fadeInUpVariant}>
        <Categories />
      </motion.div>
      
      <motion.div variants={fadeInUpVariant}>
        <Stats />
      </motion.div>
      
      <motion.div variants={fadeInUpVariant}>
        <HowItWorks />
      </motion.div>
    </motion.div>
  );
}
