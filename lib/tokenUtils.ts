"use server";

import { env } from "@/env";
import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils";

const jwtTokenSecret = env.ACCESS_TOKEN_SECRET;

const tokenSecondsRemaining = (token: string): number => {
  if (!token) return 0;

  try {
    const tokenPayload = jwtTokenSecret
      ? (jwt.verify(token, jwtTokenSecret as string) as JwtPayload)
      : (jwt.decode(token) as JwtPayload);

    if (tokenPayload && !tokenPayload.exp) {
      return 0;
    }

    const remainingSeconds =
      (tokenPayload.exp as number) - Math.floor(Date.now() / 1000);

    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
};

export const setTokenCookies = async (
  name: string,
  token: string,
  fallbackSecondsRemaining: number = 60 * 60 * 24 * 15,
) => {
  const secondsRemaining = tokenSecondsRemaining(token);

  await setCookie(name, token, secondsRemaining || fallbackSecondsRemaining);
};
