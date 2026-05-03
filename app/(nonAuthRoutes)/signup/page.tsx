"use client";

import Logo from "@/components/shadcn-studio/logo";
import { SignupForm } from "@/components/modules/Auth/signup-form";
import bamboo from "@/assets/bamboo.webp";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Sprout, Trees, Flower2 } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl"
        />
      </div>

      {/* Left Side - Form */}
      <div className="relative flex flex-col gap-8 p-6 md:p-10 lg:justify-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-2 md:justify-start"
        >
          <Link href="/" className="flex items-center gap-3 font-medium group">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Logo />
              </motion.div>
              <div className="">
                <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-900 bg-clip-text text-transparent leading-none">
                  EcoSpark
                  <span className="text-emerald-600 font-medium">Hub</span>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-1 items-center justify-center"
        >
          <div className="w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className="relative">
              {/* Decorative Icons */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -top-6 -left-6 text-green-500"
              >
                <Leaf className="w-8 h-8" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -top-6 -right-6 text-purple-500"
              >
                <Flower2 className="w-8 h-8" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-emerald-500"
              >
                <Sprout className="w-8 h-8" />
              </motion.div>

              {/* Form Card */}
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
                {/* Welcome Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent mb-2">
                    Join the Movement
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Create your account and start making a difference
                  </p>
                </motion.div>

                <SignupForm />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden lg:block">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={bamboo}
            alt="Bamboo growth"
            className="h-full w-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-transparent to-purple-900/40" />
          {/* Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-20 left-10 right-10 text-white"
          >
            <h3 className="text-4xl font-bold mb-4">
              Plant Ideas Today,
              <br />
              <span className="text-green-300">Harvest Change Tomorrow</span>
            </h3>
            <p className="text-lg text-white/90 max-w-md">
              Be part of a growing community dedicated to sustainable innovation and environmental stewardship.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
