import AddIdeaForm from "@/components/modules/Idea/AddIdeaForm";
import IdeaTables from "@/components/modules/Idea/IdeaTables";
import Pagination from "@/components/shared/pagination";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { CategoryData } from "@/types&enums&interfaces/category.interface";
import { myIdeaData } from "@/types&enums&interfaces/idea.interface";
import { QueryClient } from "@tanstack/react-query";

export const dynamic = "force-dynamic";
export default async function MyIdeasPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      await httpClient.get<CategoryData[]>("/category/all-categories"),
  });

  const categories = queryClient.getQueryData(["categories"]) as ApiResponse<
    CategoryData[]
  >;

  await queryClient.prefetchQuery({
    queryKey: ["myIdeas"],
    queryFn: async () =>
      await httpClient.get<myIdeaData[]>(`/idea/my-ideas?page=${page}`),
  });
  const myIdeas = queryClient.getQueryData(["myIdeas"]) as ApiResponse<
    myIdeaData[]
  >;

  return (
    <div className="space-y-4">
      <AddIdeaForm categories={categories?.data || []} />

      {myIdeas?.data?.length === 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">No Ideas</h2>
        </div>
      ) : (
        <div className="">
          <IdeaTables ideas={myIdeas?.data} />
          <Pagination totalPages={myIdeas.meta?.totalPages || 0} />
        </div>
      )}
    </div>
  );
}
