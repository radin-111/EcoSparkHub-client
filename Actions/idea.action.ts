"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IdeaData, IdeaStatus } from "@/types&enums&interfaces/idea.interface";
import { revalidatePath } from "next/cache";

export const createIdea = async (payload: FormData) => {
  try {
    const res = await httpClient.post<IdeaData>("/idea/create-idea", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidatePath("/dashboard/my-ideas");
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteIdea = async (id: string) => {
  try {
    const res = await httpClient.delete(`/idea/delete-idea/${id}`);
    revalidatePath("/dashboard/my-ideas");

    return res;
  } catch (err) {
    throw err;
  }
};

export const approveAndRejectIdea = async (
  id: string,
  payload: IdeaStatus.APPROVED | IdeaStatus.REJECTED,
) => {
  try {
    const res = await httpClient.patch<IdeaData>(`/idea/change-status/${id}`, {
      status: payload,
    });

    revalidatePath("/admin/pending-ideas");

    return res;
  } catch (err) {
    throw err;
  }
};
