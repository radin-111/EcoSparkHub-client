import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { IdeaData } from "@/types&enums&interfaces/idea.interface";
import IdeaTables from "@/components/modules/Idea/IdeaTables";
import Pagination from "@/components/shared/pagination";
import { CategoryData } from "@/types&enums&interfaces/category.interface";

const getDrafts = async () => {
  const res = await httpClient.get<object[] | []>("/idea/my-drafts");

  return res;
};
export const dynamic = "force-dynamic";
export default async function DraftPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["drafts"],
    queryFn: getDrafts,
  });
  const drafts = queryClient.getQueryData(["drafts"]) as ApiResponse<
    IdeaData[]
  >;

  if (drafts.data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800">No drafts found.</h1>
      </div>
    );
  }
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      await httpClient.get<CategoryData[]>("/category/all-categories"),
  });

  const categories = queryClient.getQueryData(["categories"]) as ApiResponse<
    CategoryData[]
  >;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <IdeaTables categories={categories.data} ideas={drafts.data} />
        <Pagination totalPages={Number(drafts.meta?.totalPages)} />
      </div>
    </HydrationBoundary>
  );
}
