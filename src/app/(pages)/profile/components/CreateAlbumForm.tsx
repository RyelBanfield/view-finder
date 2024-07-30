"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createAlbum } from "@/app/actions/albumActions";
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
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createAlbum(values.name);
    form.reset();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size={"sm"}
          variant={"ghost"}
          className="flex w-32 justify-evenly gap-1 text-xs"
        >
          <PlusIcon className="size-3" />
          Create Album
        </Button>
      </SheetTrigger>

      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle className="text-base">Create a new album</SheetTitle>

          <SheetDescription className="text-xs">
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
                  <FormLabel className="text-xs">Album Name</FormLabel>

                  <FormControl>
                    <Input className="text-xs" {...field} />
                  </FormControl>

                  <FormDescription className="text-xs">
                    This is public.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size={"sm"} className="text-xs" type="submit">
              Save album name
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateAlbumForm;
