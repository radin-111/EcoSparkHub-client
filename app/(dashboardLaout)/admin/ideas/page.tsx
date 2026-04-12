import AdminAllIdeas from "@/components/modules/Idea/AdminAllIdeas";
import Pagination from "@/components/shared/pagination";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { IdeaData } from "@/types&enums&interfaces/idea.interface";
import { QueryClient } from "@tanstack/react-query";
import React from "react";
export const dynamic = "force-dynamic";
export default async function AdminAllIdeasPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["allIdeas"],
    queryFn: async () =>
      await httpClient.get<IdeaData[]>(
        `/idea/approved-and-rejected-ideas?page=${page || 1}`,
      ),
  });

  const allIdeas = queryClient.getQueryData(["allIdeas"]) as ApiResponse<
    IdeaData[]
  >;

  return (
    <div>
      <AdminAllIdeas data={allIdeas?.data || []} />
      <Pagination totalPages={Number(allIdeas?.meta?.totalPages)} />
    </div>
  );
}
