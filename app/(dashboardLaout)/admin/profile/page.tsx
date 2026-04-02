import { getSession } from "@/Actions/auth.action";
import Profile from "@/components/shared/Profile";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
import React from "react";

export default async function AdminProfilePage() {
  const session = (await getSession()) as ApiResponse<SessionResponse>;
  
  return <div>
    <Profile user={session.data?.user} />
  </div>;
}
