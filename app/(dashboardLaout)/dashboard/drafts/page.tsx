import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { httpClient } from "@/lib/axios/httpClient";
// adjust path if needed

// example fetch function
const getDrafts = async () => {
  const res = await httpClient.get<object[] | []>("/idea/my-drafts"); 
  console.log(res)
  return res;
};

export default async function DraftPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["drafts"],
    queryFn: getDrafts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>DraftPage</div>
    </HydrationBoundary>
  );
}
