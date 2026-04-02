import UserStats from "@/components/modules/User/UserStats";
import { httpClient } from "@/lib/axios/httpClient";
import { StatsData } from "@/types&enums&interfaces/userStats.interface";
import React from "react";

export default async function UserDashboard() {
  const stats = await httpClient.get<StatsData>("/stats/my-stats");
  return <div>
    <UserStats stats={stats} />
  </div>;
}
