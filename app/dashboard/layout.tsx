"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-transparent absolute top-0 left-0 w-full backdrop-blur border-b flex items-center z-10 py-2">
        <div className="container">
          <div className="flex items-center justify-between">
            <Link className="flex" href={"/dashboard"}>
              <p>Farras</p>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link
                href={"/posts"}
                className="font-medium text-foreground/70 hover:text-foreground/100"
              >
                Post
              </Link>
              <Link
                href={"/posts"}
                className="font-medium text-foreground/70 hover:text-foreground/100"
              >
                Post
              </Link>
            </nav>
            <Button onClick={() => signOut()} className="flex">
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="container py-24">{children}</div>
    </div>
  );
}
