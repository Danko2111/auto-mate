"use client";

import AppNav from "@/components/AppNav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthenticatedLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="flex flex-row flex-1">
      <AppNav />
      <div className="p-8 flex-1">{children}</div>
    </div>
  );
}
