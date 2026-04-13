import IdeaCard from "@/components/modules/Idea/IdeaCard";
import Pagination from "@/components/shared/pagination";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { GeneralIdea } from "@/types&enums&interfaces/idea.interface";

import { QueryClient } from "@tanstack/react-query";
export const dynamic = "force-dynamic";
export default async function IdeasPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["ideas"],
    queryFn: async () =>
      await httpClient.get<GeneralIdea[]>(`/idea/all-ideas?page=${page || 1}`),
  });
  const ideas = queryClient.getQueryData(["ideas"]) as ApiResponse<
    GeneralIdea[]
  >;

  if (ideas.data.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">No Ideas</h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="
        grid 
        gap-6 
        sm:gap-7 
        lg:gap-8
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3
      "
        >
          {ideas.data.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center">
          <Pagination totalPages={Number(ideas.meta?.totalPages)} />
        </div>
      </div>
    </div>
  );
}
