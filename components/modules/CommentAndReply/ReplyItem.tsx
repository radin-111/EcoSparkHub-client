"use client";

import { ReplyData } from "@/types&enums&interfaces/reply.interface";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";

export default function ReplyItem({
  reply,
  sessionUserId,
}: {
  reply: ReplyData;
  sessionUserId?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(reply.content);

  const isOwner = sessionUserId === reply.userId;

  const handleEdit = () => {
    console.log("Update Reply:", {
      replyId: reply.id,
      content,
    });
    setOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete Reply:", {
      replyId: reply.id,
    });
  };

  return (
    <div className="text-sm space-y-2 p-3 rounded-lg border bg-white">
      {/* Reply Content */}
      <p className="text-sm leading-relaxed">{reply.content}</p>

      {/* Meta */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
        {reply.isUpdated && <span>(edited)</span>}
      </div>

      {/* Actions */}
      {isOwner && (
        <div className="flex items-center gap-2 pt-1">
          {/* Edit */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="flex items-center gap-1 hover:bg-muted"
              >
                <Pen className="w-4 h-4" />
                Edit
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit reply</DialogTitle>
              </DialogHeader>

              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Update your reply..."
              />

              <Button onClick={handleEdit}>Update</Button>
            </DialogContent>
          </Dialog>

          {/* Delete */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
