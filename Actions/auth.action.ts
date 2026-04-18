"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookieUtils";
import { setTokenCookies } from "@/lib/tokenUtils";
import { userServices } from "@/services/user.serivces";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import jwt from "jsonwebtoken";

import {
  ILoginResponse,
  SessionResponse,
  signupUserRequest,
  VerifyEmailResponse,
} from "@/types&enums&interfaces/auth.types";
import { loginSchema } from "@/zod/auth.schema";
import z from "zod";
import { env } from "@/env";

export interface TErrorResponse {
  success: boolean;
  message: string;
}

export const loginWithEmailAndPassword = async (
  payload: z.infer<typeof loginSchema>,
) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data.success) {
      const { accessToken, refreshToken, token } = data.data as ILoginResponse;
      await setTokenCookies("accessToken", accessToken);
      await setTokenCookies("refreshToken", refreshToken);
      await setTokenCookies("better-auth.session_token", token);
    }

    return data as ILoginResponse;
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

export const getSession = async (): Promise<
  ApiResponse<SessionResponse> | TErrorResponse
> => {
  try {
    const response = await userServices.getSession();
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: `Failed to fetch session: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

export const logout = async () => {
  try {
    const response = (await userServices.logout()) as ApiResponse<string>;

    if (response.success) {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      await deleteCookie("better-auth.session_token");
    }
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: `Logout failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

export const signup = async (payload: signupUserRequest) => {
  try {
    const response = (await userServices.signup(
      payload,
    )) as ApiResponse<ILoginResponse>;
    const { accessToken, refreshToken, token } = response.data;
    await setTokenCookies("accessToken", accessToken);
    await setTokenCookies("refreshToken", refreshToken);
    await setTokenCookies("better-auth.session_token", token);

    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: `Signup failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

export const setVerifyEmailCookie = async (email: string) => {
  try {
    const token = jwt.sign({email}, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "2m",
    });

    await setCookie("verifyEmail", token, 120);
    return {
      success: true,
      message: "Email verification cookie set successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: `Email verification failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

export const checkCookie = async () => {
  try {
    const cookie = await getCookie("verifyEmail");
    let verification = null;
    if (cookie) {
      verification = jwt.verify(cookie, env.ACCESS_TOKEN_SECRET);
    }
    return {
      success: true,
      message: "Cookie checked successfully",
      data: verification,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: `Cookie check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};


export const verifyEmail = async (otp:string) => {
  try {
    
    const cookie = await getCookie("verifyEmail");
    if (!cookie) {
      throw new Error("No verification cookie found");
    }
    
  const decoded = jwt.decode(cookie) as any;
  const result = await httpClient.post<VerifyEmailResponse>("/auth/verify-email", {
    email: decoded.email,
    otp,
  });
  if(result.success){
    const {accessToken, refreshToken, token} = result.data;
    await setTokenCookies("accessToken", accessToken);
    await setTokenCookies("refreshToken", refreshToken);
    await setTokenCookies("better-auth.session_token", token);
  }

  
  return result;
  } catch (error: unknown) {
    throw error;
  }
};