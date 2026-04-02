import Image from "next/image";
import userLogo from "@/assets/user.jpg";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { getSession } from "@/Actions/auth.action";
export default async function Avatar() {
  const session = (await getSession()) as ApiResponse<SessionResponse>;
  const imageUrl = session?.data?.user?.image as string;
  return (
    <div>
      <Image
        className="rounded-full"
        src={imageUrl || userLogo}
        alt="Avatar"
        width={40}
        height={40}
      />
    </div>
  );
}
