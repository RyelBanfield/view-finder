"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createAlbumAction } from "@/app/(pages)/profile/actions";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const formSchema = z.object({
  name: z.string().min(4).max(50),
});

const CreateAlbumForm = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createAlbumAction(values.name);
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button size={"sm"}>Create Album</Button>
      </SheetTrigger>

      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Create a new album</SheetTitle>

          <SheetDescription>
            This creates a new album on your profile. You can add photos to this
            album later.
          </SheetDescription>
        </SheetHeader>

        <br />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>This is public.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size={"sm"} type="submit">
              Save album name
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateAlbumForm;
