import AdminUsersTable from "@/components/modules/Admin/AdminUsersTable";
import CreateAdminDialog from "@/components/modules/Admin/CreateAdminDialog";
import Pagination from "@/components/shared/pagination";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { UserData } from "@/types&enums&interfaces/user.interface";
import { QueryClient } from "@tanstack/react-query";
export const dynamic = "force-dynamic";
export default async function CreateAdminPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admins"],
    queryFn: async () =>
      await httpClient.get<UserData[]>("/user/all-admins"),
  });
  const admins = queryClient.getQueryData(["admins"]) as ApiResponse<UserData[]>;
  console.log(admins)
  return (
    <div className="space-y-4">
      <CreateAdminDialog /><br />
      <AdminUsersTable data={admins?.data || []} />
      <Pagination totalPages={admins?.meta?.totalPages || 1} />
    </div>
  );
}
