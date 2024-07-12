"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateUsername } from "@/app/actions/userActions";
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
import { Tables } from "@/lib/database.types";

const formSchema = z.object({
  first_name: z
    .string()
    .min(4)
    .max(50)
    .regex(/^[A-Za-z]+$/, "First name must contain only letters.")
    .transform(
      (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
    ),
  last_name: z
    .string()
    .min(4)
    .max(50)
    .regex(/^[A-Za-z]+$/, "Last name must contain only letters.")
    .transform(
      (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
    ),
  username: z
    .string()
    .min(4)
    .max(50)
    .regex(/^\S*$/, "Username must not contain spaces.")
    .transform((val) => val.toLowerCase()),
  email: z.string().email(),
});

const EditProfileForm = ({ userProfile }: { userProfile: Tables<"users"> }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: userProfile.first_name || "",
      last_name: userProfile.last_name || "",
      username: userProfile.username || "",
      email: userProfile.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateUsername(
      userProfile.id,
      values.first_name,
      values.last_name,
      values.username,
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex grow flex-col justify-center gap-4 px-6 py-12"
      >
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">First Name</FormLabel>
              <FormControl>
                <Input className="text-xs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Last Name</FormLabel>
              <FormControl>
                <Input className="text-xs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Username</FormLabel>
              <FormControl>
                <Input className="text-xs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Email</FormLabel>
              <FormControl>
                <Input className="text-xs" {...field} disabled />
              </FormControl>
              <FormDescription className="text-xs">
                Your email is permanent for now.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size={"sm"} className="text-xs">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
