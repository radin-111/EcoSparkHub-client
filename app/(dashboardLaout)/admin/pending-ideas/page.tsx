import ApproveAndRejectTable from "@/components/modules/Idea/ApproveAndRejectIdeas";

import Pagination from "@/components/shared/pagination";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { IdeaData } from "@/types&enums&interfaces/idea.interface";
import { QueryClient } from "@tanstack/react-query";
export const dynamic = "force-dynamic";

export default async function PendingIdeasPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pendingIdeas"],
    queryFn: async () =>
      await httpClient.get<IdeaData[]>(`/idea/pending-ideas?page=${page || 1}`),
  });
  const pendingIdeas = queryClient.getQueryData([
    "pendingIdeas",
  ]) as ApiResponse<IdeaData[]>;

  if (pendingIdeas.data.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">No Ideas</h2>
      </div>
    );
  }
 
  return (
    <div>
      <ApproveAndRejectTable data={pendingIdeas.data} />
      <Pagination totalPages={Number(pendingIdeas?.meta?.totalPages)} />
    </div>
  );
}
