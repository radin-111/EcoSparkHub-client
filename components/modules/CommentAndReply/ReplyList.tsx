"use client";

import { ReplyData } from "@/types&enums&interfaces/reply.interface";
import ReplyItem from "./ReplyItem";

export default function ReplyList({
  replies,
  sessionUserId,
}: {
  replies: ReplyData[];
  sessionUserId?: string | null;
}) {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="pl-4 border-l space-y-3">
      {replies.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} sessionUserId={sessionUserId} />
      ))}
    </div>
  );
}
