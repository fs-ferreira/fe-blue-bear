"use client";

import LoginForm from "@/components/home/LoginForm"
import Logo from "@/components/home/Logo"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session) {
      redirectUser();
    }
  }, [session]);

  function redirectUser() {
    router.push('/main');
  }

  if (status === "loading") return;
  return (
    <>
      <div className="flex items-center justify-center min-h-screen lg:px-20 xl:px-40">
        <div className="grid w-full lg:grid-cols-[40%_60%] lg:min-h-[600px] xl:min-h-[800px]">
          <Logo title="Blue Bear" />
          <LoginForm />
        </div>
      </div>
    </>

  )
}
