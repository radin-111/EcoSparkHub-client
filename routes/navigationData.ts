import { getSession } from "@/Actions/auth.action";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import { SessionResponse } from "@/types&enums&interfaces/auth.types";
import { UserRoles } from "@/types&enums&interfaces/enums";

const session = (await getSession()) as ApiResponse<SessionResponse>;

const navigationData = [
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
}

if (session.success && session.data?.user?.role === UserRoles.ADMIN) {
  navigationData.push({
    title: "Dashboard",
    href: "/admin",
  });
}

export const navigationLinks = navigationData;
