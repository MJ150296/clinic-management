"use client";

import signupSuperAdminZodSchema from "@/zod schemas/Auth Schemas/Signup/SignupSuperAdminZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import axios from "axios";
import { useState } from "react";

const SuperAdminSignupForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  // 1. Define your form.
  const form = useForm<z.infer<typeof signupSuperAdminZodSchema>>({
    resolver: zodResolver(signupSuperAdminZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signupSuperAdminZodSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const handleSignUpForm = async (
      values: z.infer<typeof signupSuperAdminZodSchema>
    ) => {
      try {
        const response = await axios.post(
          "/api/auth/superAdmin/signup",
          values
        );
        console.log("response", response?.data?.data, response?.data?.message);
      } catch (error) {
        console.log("Error signing up Super Admin", error);
      }
    };
    handleSignUpForm(values);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-y-6"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-slate-900">superAdmin</h1>
            <p className="text-slate-500">Welcome Sir! Have a joint.</p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Signup</Button>
        </form>
      </Form>
    </div>
  );
};

export default SuperAdminSignupForm;
