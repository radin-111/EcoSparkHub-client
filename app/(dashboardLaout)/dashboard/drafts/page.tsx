import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
// adjust path if needed

// example fetch function
const getDrafts = async () => {
  const res = await httpClient.get<object[] | []>("/idea/my-drafts");
  console.log(res);
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
    object[] | []
  >;

  if (drafts.data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800">No drafts found.</h1>
      </div>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>DraftPage</div>
    </HydrationBoundary>
  );
}
