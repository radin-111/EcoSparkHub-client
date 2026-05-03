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
import { ThumbsUp, ThumbsDown, Crown, Star } from "lucide-react";
import { GeneralIdea } from "@/types&enums&interfaces/idea.interface";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cardHoverProps, scaleInVariant } from "@/lib/animations";

export default function IdeaCard({ idea }: { idea: GeneralIdea }) {
  const router = useRouter();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleInVariant}
      {...cardHoverProps}
      onClick={() => router.push(`/ideas/${idea.id}`)}
      className="w-full max-w-md mx-auto"
    >
      <Card className="pt-0 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
        {/* Image */}
        <CardContent className="px-0 relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-t-xl"
          >
            <Image
              src={idea.imageUrl}
              alt={idea.name}
              width={500}
              height={300}
              className="aspect-video w-full object-cover"
            />
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
              className="absolute top-3 right-3 bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-full shadow-lg"
            >
              <Crown className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </CardContent>

        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CardTitle className="text-2xl flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
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
          >
            <CardDescription className="text-gray-600">
              {new Date(idea.createdAt).toLocaleDateString()}
            </CardDescription>
          </motion.div>
        </CardHeader>

        {/* Votes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-6 text-base text-muted-foreground"
        >
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <ThumbsUp className="w-5 h-5 text-green-500" />
            <span className="font-medium">{idea.up_vote}</span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <ThumbsDown className="w-5 h-5 text-red-500" />
            <span className="font-medium">{idea.down_vote}</span>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <CardFooter className="flex flex-col items-center gap-4 pb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Badge 
              variant={idea.isPaid ? "destructive" : "secondary"}
              className={`px-4 py-2 font-medium ${
                idea.isPaid 
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0" 
                  : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
              }`}
            >
              {idea.isPaid ? "Paid" : "Free"}
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={`/ideas/${idea.id}`}
              className="w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 block"
            >
              View Idea
            </Link>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
