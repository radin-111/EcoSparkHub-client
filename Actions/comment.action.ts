"use server";
// http://localhost:3000/ideas/b9a1ab6d-f6f7-4589-a4ff-8239e05e7633
import { httpClient } from "@/lib/axios/httpClient";
import {
  CommentData,
  CreateCommentPayload,
} from "@/types&enums&interfaces/comment.interface";

import { revalidatePath } from "next/cache";

export const createComment = async (payload: CreateCommentPayload) => {
  try {
    const res = await httpClient.post<CommentData>(
      "/comment/create-comment",
      payload,
    );
    revalidatePath(`/ideas/${payload.ideaId}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const updateComment = async (
  commentId: string,
  payload: { content: string },
) => {
  try {
    const res = await httpClient.patch<CommentData>(
      `/comment/update-comment/${commentId}`,
      payload,
    );
    revalidatePath("/ideas");
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const res = await httpClient.delete<CommentData>(
      `/comment/delete-comment/${commentId}`,
    );
    revalidatePath("/ideas");
    return res;
  } catch (err) {
    throw err;
  }
};
