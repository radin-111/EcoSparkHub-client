"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenCookies } from "@/lib/tokenUtils";
import { ILoginResponse } from "@/types&enums&interfaces/auth.types";
import { loginSchema } from "@/zod/auth.schema";
import z from "zod";

export interface TErrorResponse {
  success: boolean;
  message: string;
}

export const loginWithEmailAndPassword = async (
  payload: z.infer<typeof loginSchema>,
): Promise<ILoginResponse | TErrorResponse> => {
  try {
    const response = await httpClient.post("/auth/signin", payload) ;
    const { accessToken, refreshToken, token } = response.data as ILoginResponse;

    await setTokenCookies("accessToken", accessToken);
    await setTokenCookies("refreshToken", refreshToken);
    await setTokenCookies("better-auth.session_token", token);
   
    return response.data as ILoginResponse;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      success: false,
      message: `Login failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
