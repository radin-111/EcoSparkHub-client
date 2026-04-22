import BuyIdea from "@/components/modules/Idea/BuyIdea";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { BuyIdeaData } from "@/types&enums&interfaces/idea.interface";
import { QueryClient } from "@tanstack/react-query";

export default async function BuyIdeaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const queryClient = new QueryClient();
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["idea", "buy"],
    queryFn: async () =>
      await httpClient.get<BuyIdeaData>(`/idea/some-data/${id}`),
  });
  const data = queryClient.getQueryData(["idea", "buy"]) as ApiResponse<BuyIdeaData>;
  
  return <div className="my-10"><BuyIdea idea={data.data} /></div>;
}
