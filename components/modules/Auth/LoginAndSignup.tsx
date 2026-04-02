import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function LoginAndSignup() {
  return (
    <div className="flex gap-4">
      <Button variant={"default"} className="p-5">
        <Link href="/login">Login</Link>
      </Button>
      <Button variant={"outline"} className="p-5">
        <Link href="/signup">Signup</Link>
      </Button>
    </div>
  );
}
