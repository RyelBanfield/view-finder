"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginWithEmail } from "@/app/actions/userActions";
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

const formSchema = z.object({
  email: z.string().email(),
});

const LoginForm = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setButtonDisabled(true);
    await loginWithEmail(values.email);
    setEmailSubmitted(true);
  };

  return (
    <>
      {!emailSubmitted && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex grow flex-col justify-center gap-6 p-6"
          >
            <h1 className="text-center text-2xl font-bold">Login</h1>

            <p className="text-center text-muted-foreground">
              If you don&apos;t have an account, one will be created for you.
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@mail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We will send you a magic link.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size={"sm"} type="submit" disabled={buttonDisabled}>
              {buttonDisabled && (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              )}

              {!buttonDisabled && "Get magic link"}
            </Button>
          </form>
        </Form>
      )}

      {emailSubmitted && (
        <div className="flex grow flex-col justify-center gap-6 p-12">
          <h1 className="text-center text-2xl font-bold">Magic Link Sent</h1>

          <p className="text-center text-muted-foreground">
            Check your email for a magic link.
          </p>
        </div>
      )}
    </>
  );
};

export default LoginForm;
