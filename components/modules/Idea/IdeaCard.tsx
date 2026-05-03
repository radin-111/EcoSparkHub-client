"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Crown, Star, Eye, Heart, TrendingUp, Clock } from "lucide-react";
import { GeneralIdea } from "@/types&enums&interfaces/idea.interface";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cardHoverProps, scaleInVariant } from "@/lib/animations";
import { useState } from "react";

export default function IdeaCard({ idea }: { idea: GeneralIdea }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleInVariant}
      {...cardHoverProps}
      onClick={() => router.push(`/ideas/${idea.id}`)}
      className="w-full max-w-md mx-auto group"
    >
      <Card className="pt-0 overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/70 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer relative">
        {/* Image */}
        <CardContent className="px-0 relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-t-3xl relative"
          >
            {!imageError ? (
              <Image
                src={idea.imageUrl}
                alt={idea.name}
                width={500}
                height={300}
                className="aspect-video w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="aspect-video w-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <div className="text-4xl mb-2">💡</div>
                  <p className="text-sm">Image not available</p>
                </div>
              </div>
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* View Count */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1"
            >
              <Eye className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
            </motion.div>

            {/* Paid Crown */}
            {idea.isPaid && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.5, 
                  type: "spring" as const, 
                  stiffness: 200,
                  delay: 0.2
                }}
                className="absolute top-3 right-3 bg-gradient-to-br from-yellow-400 to-orange-500 p-2.5 rounded-full shadow-lg border-2 border-white/20"
              >
                <Crown className="w-5 h-5 text-white" />
              </motion.div>
            )}
            
            {/* Like Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-white/20"
            >
              <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
            </motion.button>
          </motion.div>
        </CardContent>

        {/* Header */}
        <CardHeader className="text-center space-y-3 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CardTitle className="text-xl lg:text-2xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent leading-tight">
              {idea.name}
              {idea.isPaid && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring" as const, 
                    stiffness: 200,
                    delay: 0.3
                  }}
                >
                  <Star className="w-5 h-5 text-yellow-500" />
                </motion.div>
              )}
            </CardTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500"
          >
            <Clock className="w-4 h-4" />
            <CardDescription className="text-gray-600">
              {new Date(idea.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </CardDescription>
          </motion.div>
        </CardHeader>

        {/* Engagement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center gap-6 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl mx-4"
        >
          <motion.div 
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-1.5 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
              <ThumbsUp className="w-4 h-4 text-green-600" />
            </div>
            <span className="font-semibold text-gray-700 text-sm">{idea.up_vote}</span>
          </motion.div>

          <div className="w-px h-6 bg-gray-300" />

          <motion.div 
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-1.5 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors">
              <ThumbsDown className="w-4 h-4 text-red-600" />
            </div>
            <span className="font-semibold text-gray-700 text-sm">{idea.down_vote}</span>
          </motion.div>

          <div className="w-px h-6 bg-gray-300" />

          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-1.5 rounded-full bg-purple-100">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-semibold text-gray-700 text-sm">
              {Math.round((idea.up_vote / (idea.up_vote + idea.down_vote)) * 100) || 0}%
            </span>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <CardFooter className="flex flex-col items-center gap-4 pb-6 pt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Badge 
              variant={idea.isPaid ? "destructive" : "secondary"}
              className={`px-4 py-2 font-semibold text-xs uppercase tracking-wider rounded-full border-2 ${
                idea.isPaid 
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-600 shadow-lg" 
                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-600 shadow-lg"
              }`}
            >
              {idea.isPaid ? "Premium" : "Free"}
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Link
              href={`/ideas/${idea.id}`}
              className="w-full text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 block relative overflow-hidden group"
            >
              <span className="relative z-10">View Idea</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </CardFooter>
        
        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.6 }}
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl pointer-events-none"
        />
      </Card>
    </motion.div>
  );
}
