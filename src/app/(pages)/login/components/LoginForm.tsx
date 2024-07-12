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
            className="flex grow flex-col justify-center gap-6 px-6 py-12"
          >
            <div className="space-y-4">
              <h1 className="text-center text-xl font-bold">Login</h1>

              <p className="text-center text-xs text-muted-foreground">
                If you don&apos;t have an account, one will be created for you.
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="name@mail.com"
                      className="text-xs"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription className="text-xs">
                    We will send you a magic link.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size={"sm"}
              type="submit"
              disabled={buttonDisabled}
              className="text-xs"
            >
              {buttonDisabled && (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              )}

              {!buttonDisabled && "Get magic link"}
            </Button>
          </form>
        </Form>
      )}

      {emailSubmitted && (
        <div className="flex grow flex-col justify-center gap-4 p-12">
          <h1 className="text-center text-xl font-bold">
            We&apos;ve sent your link.
          </h1>

          <p className="text-pretty text-center text-xs text-muted-foreground">
            Check your email for your magic link. If you don&apos;t see it,
            check your spam folder.
          </p>
        </div>
      )}
    </>
  );
};

export default LoginForm;
