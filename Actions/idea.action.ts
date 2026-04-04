"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IdeaData } from "@/types&enums&interfaces/idea.interface";

export const createIdea = async (payload: FormData) => {
  try {
    const res = await httpClient.post<IdeaData>("/idea/create-idea", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
