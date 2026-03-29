"use client";

import Logo from "@/components/shadcn-studio/logo";
import { SignupForm } from "@/components/signup-form";
import bamboo from "@/assets/bamboo.webp";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2">
              <Logo />
              <div className="">
                <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                  EcoSpark
                  <span className="text-emerald-600 font-medium">Hub</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={bamboo}
          alt="Image"
          className="absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale object-cover"
        />
      </div>
    </div>
  );
}
