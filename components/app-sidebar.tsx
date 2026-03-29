import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { UserRoles } from "@/types&enums/enums";
import { adminRoutes, userRoutes } from "@/routes/routes";
import { routes } from "@/types&enums/routes.types";

let route: routes = [];
route = adminRoutes;
// if (role === UserRoles.ADMIN) {
//   route = adminRoutes;
// } else {
//   route = userRoutes;
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader></SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {route.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.name} className="mt-6 mx-2">
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.path}
                        className="flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
