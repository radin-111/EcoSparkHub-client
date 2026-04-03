"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
import { revalidatePath } from "next/cache";

export const updateUserProfile = async (payload: FormData) => {
  try {
    const updatedData = await httpClient.patch<SessionResponse>(
      "/user/update-user",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    revalidatePath("/dashboard/profile");
    revalidatePath("/admin/profile");
    return updatedData.success;
  } catch {
    return false;
  }
};
