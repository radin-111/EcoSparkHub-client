import Navbar from "@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01";
import { Footer } from "@/components/shared/Footer";
import { navigationLinks } from "@/routes/navigationData";

import React, { ReactNode } from "react";

export default async function CommonLayout ({ children }: { children: ReactNode }) {
  
  return (
    <div>
      <Navbar navigationData={navigationLinks} />
      {children}
      <Footer />
    </div>
  );
}
