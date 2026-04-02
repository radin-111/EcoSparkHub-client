import { httpClient } from "@/lib/axios/httpClient";

import { SessionResponse } from "@/types&enums&interfaces/auth.types";

export const userServices = {
  getSession: async () => {
    try {
      const response =
        await httpClient.get<SessionResponse>("/user/get-session");
      return response;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await httpClient.post<string>("/auth/signout");
      return response;
    } catch (error) {
      return {
        success: false,
        message: `Logout failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
};
