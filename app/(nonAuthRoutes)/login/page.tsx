"use client";

import Image from "next/image";
import plantTree from "@/assets/plant-tree.jpg";
import Link from "next/link";
import Logo from "@/components/shadcn-studio/logo";
import LoginForm from "@/components/modules/Auth/login-form";
import { motion } from "framer-motion";
import { Leaf, Sprout, Trees } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                className="absolute -top-6 -left-6 text-emerald-500"
              >
                <Leaf className="w-8 h-8" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -top-6 -right-6 text-blue-500"
              >
                <Sprout className="w-8 h-8" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-green-500"
              >
                <Trees className="w-8 h-8" />
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
                    Welcome Back
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Sign in to continue your eco-journey
                  </p>
                </motion.div>

                <LoginForm />
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
            src={plantTree}
            alt="Plant tree"
            className="h-full w-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-transparent to-blue-900/40" />
          {/* Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-20 left-10 right-10 text-white"
          >
            <h3 className="text-4xl font-bold mb-4">
              Grow Your Ideas,
              <br />
              <span className="text-emerald-300">Nurture the Planet</span>
            </h3>
            <p className="text-lg text-white/90 max-w-md">
              Join thousands of eco-innovators sharing sustainable ideas and making a real difference.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
