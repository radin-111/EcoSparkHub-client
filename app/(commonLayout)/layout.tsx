import Navbar from "@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01";
import { Footer } from "@/components/shared/Footer";


import React, { ReactNode } from "react";
import { getNavigationLinks } from "@/routes/navigationData";

export default async function CommonLayout ({ children }: { children: ReactNode }) {
  const navigationLinks = await getNavigationLinks();
  return (
    <div>
      <Navbar navigationData={navigationLinks} />
      {children}
      <Footer />
    </div>
  );
}
