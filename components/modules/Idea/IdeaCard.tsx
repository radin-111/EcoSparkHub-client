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

export default function IdeaCard({ idea }: { idea: GeneralIdea }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/ideas/${idea.id}`)}
      className="w-full max-w-md mx-auto pt-0 overflow-hidden rounded-2xl hover:cursor-pointer hover:shadow-xl transition-all"
    >
      {/* Image */}
      <CardContent className="px-0 relative">
        <Image
          src={idea.imageUrl}
          alt={idea.name}
          width={500}
          height={300}
          className="aspect-video w-full rounded-t-xl object-cover"
        />

        {/* Paid Crown */}
        {idea.isPaid && (
          <div className="absolute top-3 right-3 bg-black/70 p-2 rounded-full">
            <Crown className="w-5 h-5 text-yellow-400" />
          </div>
        )}
      </CardContent>

      {/* Header */}
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          {idea.name}
          {idea.isPaid && <Star className="w-5 h-5 text-yellow-500" />}
        </CardTitle>

        <CardDescription>
          {new Date(idea.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      {/* Votes */}
      <div className="flex justify-center gap-6 text-base text-muted-foreground">
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-5 h-5 text-green-500" />
          {idea.up_vote}
        </div>

        <div className="flex items-center gap-1">
          <ThumbsDown className="w-5 h-5 text-red-500" />
          {idea.down_vote}
        </div>
      </div>

      {/* Footer */}
      <CardFooter className="flex flex-col items-center gap-4 pb-6">
        <Badge variant={idea.isPaid ? "destructive" : "secondary"}>
          {idea.isPaid ? "Paid" : "Free"}
        </Badge>

        <Link
          href={`/ideas/${idea.id}`}
          className="w-full text-center bg-primary py-2 rounded-xl text-white font-semibold"
        >
          View Idea
        </Link>
      </CardFooter>
    </Card>
  );
}
