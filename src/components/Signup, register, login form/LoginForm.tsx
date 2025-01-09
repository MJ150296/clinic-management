"use client";

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
import loginZodSchema from "@/zod schemas/Auth Schemas/Login/LoginZschema";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginZodSchema>>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginZodSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const handleSignUpForm = async (
      values: z.infer<typeof loginZodSchema>
    ) => {
      try {
        const response = await axios.post(
          "/api/auth/login",
          values
        );
        console.log("response", response?.data);
      } catch (error) {
        console.log("Error while logging in", error);
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
            <h1 className="text-4xl font-bold text-slate-900">superAdmin Login</h1>
            <p className="text-slate-500">Please enter your credentials</p>
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
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
