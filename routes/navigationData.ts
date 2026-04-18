import { getSession } from "@/Actions/auth.action";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
import { UserRoles } from "@/types&enums&interfaces/enums";

export async function getNavigationLinks() {
  const session = (await getSession()) as ApiResponse<SessionResponse>;

  const navigationData = [
    { title: "Home", href: "/" },
    { title: "Ideas", href: "/ideas" },
    { title: "Submit Idea", href: "/dashboard/my-ideas" },
  ];

  if (!session.success || !session.data?.user) {
    return navigationData;
  }

  const role = session.data.user.role;

  navigationData.push({
    title: "Dashboard",
    href: role === UserRoles.ADMIN ? "/admin" : "/dashboard",
  });

  return navigationData;
}

