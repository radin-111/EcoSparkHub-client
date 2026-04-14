import { getSession } from "@/Actions/auth.action";
import { Comments } from "@/components/modules/CommentAndReply/Comments";
import IdeaDetails from "@/components/modules/Idea/IdeaDetails";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
import { CommentData } from "@/types&enums&interfaces/comment.interface";
import { IdeaData } from "@/types&enums&interfaces/idea.interface";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
export const dynamic = "force-dynamic";
export default async function SingleIdeaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = ((await getSession()) as ApiResponse<SessionResponse>) || {};

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["idea", id],
    queryFn: async () => await httpClient.get<IdeaData>(`/idea/${id}`),
  });

  await queryClient.prefetchQuery({
    queryKey: ["comments", id],
    queryFn: async () => await httpClient.get<IdeaData>(`/comment/${id}`),
  });
  const idea = queryClient.getQueryData(["idea", id]) as ApiResponse<IdeaData>;
  const comments = queryClient.getQueryData(["comments", id]) as ApiResponse<
    CommentData[]
  >;

  return (
  
      <div className="max-w-8/12 mx-auto">
        <IdeaDetails idea={idea.data} />
        <Comments
          comments={comments.data}
          ideaId={id}
          sessionUserId={session?.data?.user?.id || null}
        />
      </div>
    
  );
}
