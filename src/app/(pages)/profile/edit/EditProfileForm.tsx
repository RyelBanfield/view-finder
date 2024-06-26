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
import { Input } from "@/components/ui/input";

import { Database } from "../../../../supabase/types";
import { updateUsername } from "./actions";

type UserProfile = Database["public"]["Tables"]["users"]["Row"];

const formSchema = z.object({
  username: z.string().min(4).max(50),
  email: z.string().email(),
});

const EditProfileForm = ({ userProfile }: { userProfile: UserProfile }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userProfile.username || "",
      email: userProfile.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateUsername(userProfile.id, values.username);
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-6 px-6 py-24 lg:px-36">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>This is permanent for now.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size={"sm"}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
