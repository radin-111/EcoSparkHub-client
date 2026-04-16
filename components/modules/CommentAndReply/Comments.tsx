"use client";

import { useState } from "react";
import { CommentData } from "@/types&enums&interfaces/comment.interface";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import CommentCard from "./CommentCard";
import { toast } from "sonner";
import { createComment } from "@/Actions/comment.action";
import { ApiResponse } from "@/types&enums&interfaces/api.types";

export function Comments({
  comments,
  ideaId,
  sessionUserId,
}: {
  comments: CommentData[];
  ideaId: string;
  sessionUserId?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit =async () => {
    const toastId = toast.loading("Creating comment...") ;
    try {
     
      const res = await createComment({
        ideaId,
        content,
      }) as unknown as ApiResponse<CommentData>;
      if (res?.success) {
        toast.success("Comment created successfully", { id: toastId });
      } else {
        toast.error("Failed to create comment", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed to create comment", { id: toastId });
    }
    setContent("");
    setOpen(false);
  };

  return (
    <div className="space-y-6 my-5">
      {sessionUserId && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Comment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a comment</DialogTitle>
            </DialogHeader>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogContent>
        </Dialog>
      )}

      <div
        className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-3 
    gap-4
    items-start
  "
      >
        {comments.map((comment: CommentData) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            sessionUserId={sessionUserId}
          />
        ))}
      </div>
    </div>
  );
}
