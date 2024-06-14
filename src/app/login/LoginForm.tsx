"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";

import { loginWithEmail } from "./actions";

const formSchema = z.object({
  email: z.string().email(),
});

const LoginForm = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setEmailSubmitted(true);
    loginWithEmail(values.email);
  };

  return !emailSubmitted ? (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-96 grow flex-col justify-center gap-5 py-12"
      >
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <p className="text-center text-sm">
          If you don&apos;t have an account, one will be created for you.
        </p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="contact@viewfinder.cam" {...field} />
              </FormControl>
              <FormDescription>We will send you a magic link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  ) : (
    <div className="flex grow flex-col items-center justify-center gap-5 py-12">
      <h1 className="text-center text-3xl font-bold">Magic Link Sent!</h1>
      <p className="text-center text-sm">
        Check your email for a magic link. <br /> If you don&apos;t see it,
        check your spam folder.
      </p>
    </div>
  );
};

export default LoginForm;
