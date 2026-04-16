export interface CreateReplyPayload {
  commentId: string;
  content: string;
}
export interface UpdateReplyPayload {
  content: string;
}
export interface ReplyData {
  id: string;
  userId: string;
  commentId: string;
  content: string;
  isUpdated: boolean;
  createdAt: string;
  updatedAt: string;
}