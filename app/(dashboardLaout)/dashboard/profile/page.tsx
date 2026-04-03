import { getSession } from "@/Actions/auth.action";
import Profile from "@/components/shared/Profile";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
export const dynamic = "force-dynamic";

export default async function UserProfilePage() {
  const session = (await getSession()) as ApiResponse<SessionResponse>;
  return (
    <div>
      <Profile user={session.data?.user} />
    </div>
  );
}
