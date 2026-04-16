"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  CreateReplyPayload,
  ReplyData,
  UpdateReplyPayload,
} from "@/types&enums&interfaces/reply.interface";
import { revalidatePath } from "next/cache";

export const createReply = async (payload: CreateReplyPayload) => {
  try {
    const res = await httpClient.post<ReplyData>(
      "/reply/create-reply",
      payload,
    );
    revalidatePath("/ideas");
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateReply = async (id: string, payload: UpdateReplyPayload) => {
  try {
    const res = await httpClient.patch<ReplyData>(
      `/reply/update-reply/${id}`,
      payload,
    );
    revalidatePath("/ideas");
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteReply = async (id: string) => {
  try {
    const res = await httpClient.delete(`/reply/delete-reply/${id}`);
    revalidatePath("/ideas");
    return res;
  } catch (err) {
    throw err;
  }
};
