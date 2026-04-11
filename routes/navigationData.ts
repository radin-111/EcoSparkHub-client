import { getSession } from "@/Actions/auth.action";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
import { UserRoles } from "@/types&enums&interfaces/enums";

export async function getNavigationLinks() {
  const session = (await getSession()) as ApiResponse<SessionResponse>;

  let navigationData: { title: string; href: string }[] = [];
  navigationData = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Ideas",
      href: "/ideas",
    },
    {
      title: "Submit Idea",
      href: "/dashboard/my-ideas",
    },
  ];
 
  if (session.success && session.data?.user?.role === UserRoles.MEMBER) {
    navigationData.push({
      title: "Dashboard",
      href: "/dashboard",
    });
    return navigationData;
  }

  if (session.success && session.data?.user?.role === UserRoles.ADMIN) {
    navigationData.push({
      title: "Dashboard",
      href: "/admin",
    });
    return navigationData;
  }

  return navigationData;
}
export const navigationLinks = await getNavigationLinks();
