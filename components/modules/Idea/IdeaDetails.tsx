"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { IdeaData } from "@/types&enums&interfaces/idea.interface";

export default function IdeaDetails({ idea }: { idea: IdeaData }) {
  return (
    <div className="w-full min-h-screen bg-white py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Image Section */}
        <div className="w-full">
          <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] rounded-2xl overflow-hidden border">
            <Image
              src={idea.imageUrl || idea.image}
              alt={idea.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Title + Badges */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            {idea.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{idea.status}</Badge>

            {idea.isPaid && (
              <Badge className="bg-green-600 text-white">
                Paid: ${idea.price}
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {idea.description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-xl"
            >
              <ThumbsUp size={16} /> {idea.up_vote}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-xl"
            >
              <ThumbsDown size={16} /> {idea.down_vote}
            </Button>
          </div>

          {/* Dates */}
          <div className="text-xs text-muted-foreground text-right space-y-1">
            <p>Created: {new Date(idea.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(idea.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Content Section */}
        <Card className="border rounded-2xl">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold">Full Details</h2>

            <div className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {idea.content}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
