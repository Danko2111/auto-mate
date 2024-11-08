"use client";

import SigninForm from "@/components/SigninForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SinginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard/overview"); // Redirect if already signed in
    }
  }, [session]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-7xl text-primary font-bold mb-5">Sign In</h1>
      <h2 className="text-xl text-base-content font-bold mb-20">
        and start using now!
      </h2>
      <SigninForm />
    </div>
  );
}
