"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CommentData } from "@/types&enums&interfaces/comment.interface";
import ReplyList from "./ReplyList";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { Pen, Trash2, Reply } from "lucide-react";
import { deleteComment, updateComment } from "@/Actions/comment.action";
import { toast } from "sonner";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import Swal from "sweetalert2";

export default function CommentCard({
  comment,
  sessionUserId,
}: {
  comment: CommentData;
  sessionUserId?: string | null;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);

  const [content, setContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");

  const hasReplies = comment.replies && comment.replies.length > 0;
  const isOwner = sessionUserId === comment.userId;
  const isAuthenticated = !!sessionUserId;

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating comment...");
    try {
      const res = (await updateComment(comment.id, {
        content,
      })) as unknown as ApiResponse<CommentData>;
      if (res?.success) {
        toast.success("Comment updated successfully", { id: toastId });
      } else {
        toast.error("Failed to update comment", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed to update comment", { id: toastId });
    }
    setEditOpen(false);
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting comment...");
        try {
          const res = (await deleteComment(
            comment.id,
          )) as unknown as ApiResponse<CommentData>;
          if (res?.success) {
            toast.success("Comment deleted successfully", { id: toastId });
          } else {
            toast.error("Failed to delete comment", { id: toastId });
          }
        } catch (err) {
          toast.error("Failed to delete comment", { id: toastId });
        }
      }
    });
  };

  // -------------------------
  // REPLY ACTION
  // -------------------------
  const handleReply = () => {
    const toastId = toast.loading("Creating reply...");

    setReplyContent("");
    setReplyOpen(false);
  };

  return (
    <Card className="border bg-white">
      <CardContent className="p-4 space-y-3">
        {/* Comment Content */}
        <p className="text-sm leading-relaxed">{comment.content}</p>

        {/* Meta */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          {comment.isUpdated && <span>(edited)</span>}
        </div>

        {/* ACTIONS ROW */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Reply Button (AUTH ONLY) */}
          {isAuthenticated && (
            <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex items-center gap-1"
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Write a reply</DialogTitle>
                </DialogHeader>

                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                />

                <Button onClick={handleReply}>Submit</Button>
              </DialogContent>
            </Dialog>
          )}

          {/* Edit (OWNER ONLY) */}
          {isOwner && (
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
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
                  <DialogTitle>Edit comment</DialogTitle>
                </DialogHeader>

                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Update your comment..."
                />

                <Button onClick={handleUpdate}>Update</Button>
              </DialogContent>
            </Dialog>
          )}

          {/* Delete (OWNER ONLY) */}
          {isOwner && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          )}
        </div>

        {/* Replies Toggle */}
        {hasReplies && (
          <Button
            variant="ghost"
            size="sm"
            className="w-fit px-0 text-blue-600"
            onClick={() => setShowReplies((prev) => !prev)}
          >
            {showReplies
              ? "Hide replies"
              : `View replies (${comment.replies.length})`}
          </Button>
        )}

        {/* Replies */}
        {showReplies && (
          <ReplyList replies={comment.replies} sessionUserId={sessionUserId} />
        )}
      </CardContent>
    </Card>
  );
}
