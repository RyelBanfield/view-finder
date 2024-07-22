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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
});

const LoginForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const error = await loginWithEmail(values.email);

    if (error) {
      toast({
        title: "There was an error.",
        description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <>
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
              <FormItem className="mx-auto w-full max-w-md">
                <FormLabel className="text-xs">Email</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="name@mail.com"
                    disabled={isSubmitting}
                    className="text-xs"
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
            type="submit"
            size={"sm"}
            disabled={isSubmitting}
            className="mx-auto w-full max-w-md text-xs"
          >
            {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}

            {!isSubmitting && "Get magic link"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
