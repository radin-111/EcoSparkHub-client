"use client";

import { IdeaData } from "@/types&enums&interfaces/idea.interface";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  idea: IdeaData | null;
  open: boolean;

  onOpenChange: (open: boolean) => void;
};

export default function IdeaDetailsDialog({ idea, open, onOpenChange }: Props) {
  if (!idea) return null;

  const handleApprove = () => {
    console.log("Approved:", idea);
    onOpenChange(false);
  };

  const handleReject = () => {
    console.log("Rejected:", idea);
    onOpenChange(false);
  };

  const imageSrc = idea.imageUrl || idea.image || "/placeholder.png";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Idea Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="w-full flex justify-center">
            <Image
              src={imageSrc}
              alt={idea.name || "Idea image"}
              width={300}
              height={200}
              className="rounded object-cover"
            />
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl font-semibold">{idea.name ?? "Untitled"}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {idea.description ?? "No description"}
            </p>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Status</p>
              <p>{idea.status ?? "Unknown"}</p>
            </div>

            <div>
              <p className="font-medium">Price</p>
              <p>{idea.isPaid ? `$${idea.price}` : "Free"}</p>
            </div>

            <div>
              <p className="font-medium">Votes</p>
              <p>
                👍 {idea.up_vote ?? 0} / 👎 {idea.down_vote ?? 0}
              </p>
            </div>

            <div>
              <p className="font-medium">Created</p>
              <p>
                {idea.createdAt
                  ? new Date(idea.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
