import Navbar from "@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01";
import { Footer } from "@/components/shared/Footer";

import React, { ReactNode } from "react";

export default async function CommonLayout ({ children }: { children: ReactNode }) {
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
 
  return (
    <div>
      <Navbar navigationData={navigationData} />
      {children}
      <Footer />
    </div>
  );
}
