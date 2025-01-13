"use client";
import SuperAdminSignupForm from "@/components/Forms/SuperAdminSignupForm copy";
import LoginForm from "@/components/Signup, register, login form/LoginForm";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="w-full h-full flex">
        <div className="w-1/2 flex flex-col bg-[#18181b]"></div>
        <div className="w-1/2 flex">
          {/* <LoginForm /> */}

          {/* <button onClick={() => signIn()}>Login</button> */}

          <SuperAdminSignupForm />
        </div>
      </div>
    </div>
  );
}
