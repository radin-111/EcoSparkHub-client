import { getSession } from "@/Actions/auth.action";
import LoginAndSignup from "./LoginAndSignup";
import Logout from "./Logout";
import Avatar from "./Avatar";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
import { ApiResponse } from "@/types&enums&interfaces/api.types";

export default async function Session() {
  const session = (await getSession()) as ApiResponse<SessionResponse>;

  if (!session.success) {
    return <LoginAndSignup />;
  } else {
    return (
      <div className="flex items-center">
        <Avatar imageUrl={session?.data?.user?.image as string} />
        <Logout />
      </div>
    );
  }
}
