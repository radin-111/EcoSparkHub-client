import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    FRONTEND_URL: z.url(),
    BACKEND_URL: z.url(),
    API_BASE_URL: z.url(),
  },
  client: {
    NEXT_PUBLIC_FRONTEND_URL: z.url(),
    NEXT_PUBLIC_BACKEND_URL: z.url(),
    NEXT_PUBLIC_API_BASE_URL: z.url(),
  },
  runtimeEnv: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});
