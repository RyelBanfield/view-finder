"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/database.types";

import { deleteAlbumAction } from "./actions";

const DeleteAlbumButton = ({
  userID,
  albumID,
  photos,
}: {
  userID: string;
  albumID: string;
  photos: Tables<"photos">[] | null;
}) => {
  const handleDelete = () => {
    deleteAlbumAction(userID, albumID, photos);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          Delete Album
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            album and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete Permanently
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlbumButton;
