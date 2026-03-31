import { MenuIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import LogoImage from "@/assets/svg/logo";

type NavigationItem = {
  title: string;
  href: string;
}[];

const Navbar = ({ navigationData }: { navigationData: NavigationItem }) => {
  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-4 sm:px-6">
        <div className="text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16">
          <Link href="/" className="flex items-center gap-1">
            <LogoImage />
            <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
              EcoSpark
              <span className="text-emerald-600 font-medium">Hub</span>
            </span>
          </Link>
          {/* <Link href="/" className="hover:text-primary max-md:hidden">
            Home
          </Link>
          <Link href="/ideas" className="hover:text-primary max-md:hidden">
            Ideas
          </Link>

          <Link href="/submit-idea" className="hover:text-primary max-md:hidden">
            Submit Idea
          </Link> */}
         {
          navigationData.map((item, index) => (
            <Link key={index} href={item.href} className="hover:text-primary max-md:hidden">
              {item.title}
            </Link>
          ))
         }
        </div>

        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden" asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                {navigationData.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <Link href={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
