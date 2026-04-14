import { ReplyData } from "./reply.interface";

export interface CommentData {
  id: string;
  userId: string;
  content: string;
  isUpdated: boolean;
  createdAt: string;
  updatedAt: string;
  replies: ReplyData[] | [];
}
