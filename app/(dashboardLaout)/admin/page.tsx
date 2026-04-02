import AdminStats from "@/components/modules/Admin/AdminStats";
import { httpClient } from "@/lib/axios/httpClient";
import { AdminStatsData } from "@/types&enums&interfaces/adminStats.interface";



export default async function AdminDashboard() {
  const stats = await httpClient.get<AdminStatsData>("/stats/admin-stats");

  return (
    <div>
      <AdminStats stats={stats} />
    </div>
  );
}
