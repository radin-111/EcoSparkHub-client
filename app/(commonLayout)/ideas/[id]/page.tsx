import { getSession } from "@/Actions/auth.action";
import { Comments } from "@/components/modules/CommentAndReply/Comments";
import IdeaDetails from "@/components/modules/Idea/IdeaDetails";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
import { CommentData } from "@/types&enums&interfaces/comment.interface";
import { IdeaData, Voted } from "@/types&enums&interfaces/idea.interface";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function SingleIdeaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const queryClient = new QueryClient();
  const { id } = await params;

  const session = ((await getSession()) as ApiResponse<SessionResponse>) || {};
  if (session?.data?.user?.id) {
    await queryClient.prefetchQuery({
      queryKey: ["isVoted", id],
      queryFn: async () => await httpClient.get<Voted>(`/idea/voted/${id}`),
    });
  }

  await queryClient.prefetchQuery({
    queryKey: ["idea", id],
    queryFn: async () => await httpClient.get<IdeaData>(`/idea/${id}`),
  });

  await queryClient.prefetchQuery({
    queryKey: ["comments", id],
    queryFn: async () => await httpClient.get<IdeaData>(`/comment/${id}`),
  });
  const idea = queryClient.getQueryData(["idea", id]) as ApiResponse<any>;
  const comments = queryClient.getQueryData(["comments", id]) as ApiResponse<
    CommentData[]
  >;
if(idea.data.redirect){
  return redirect(`/buy/${id}`);
}



  const voted = queryClient.getQueryData(["isVoted", id]) as ApiResponse<Voted> || null;
  const isVoted = voted?.data || false;
  return (
    <div className="max-w-8/12 mx-auto">
      <IdeaDetails
        idea={idea.data as IdeaData}
        sessionUserId={session?.data?.user?.id || null}
        isVoted={isVoted.id ? true : false}
        isUpvoted={voted?.data?.isUpVote || false}
      />
      <Comments
        comments={comments.data}
        ideaId={id}
        sessionUserId={session?.data?.user?.id || null}
      />
    </div>
  );
}
