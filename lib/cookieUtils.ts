"use server";
import { cookies } from "next/headers";

export const setCookie = async (
  name: string,
  value: string,
  maxAgeInSeconds: number,
) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    secure: true,
    httpOnly: true,
    maxAge: maxAgeInSeconds,
    path: "/",
    sameSite: "strict",
  });
};
export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};
