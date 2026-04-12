import AdminUsersTable from "@/components/modules/Admin/AdminUsersTable";
import Pagination from "@/components/shared/pagination";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { UserData } from "@/types&enums&interfaces/user.interface";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

export const dynamic = "force-dynamic";
export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: async () => await httpClient.get<UserData[]>("/user/all-users"),
  });
  const users = queryClient.getQueryData(["users"]) as ApiResponse<UserData[]>;
  
  return (
    <div>
      <AdminUsersTable data={users?.data || []} />
      <Pagination totalPages={Number(users?.meta?.totalPages)} />
    </div>
  );
}
