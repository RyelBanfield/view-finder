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

import { deletePhotoAction } from "./actions";

const DeletePhotoButton = ({
  photoID,
  albumID,
  filePath,
}: {
  photoID: string;
  albumID: string;
  filePath: string;
}) => {
  const handleDelete = () => {
    deletePhotoAction(photoID, albumID, filePath);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          Delete Photo
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            photo and remove it from our servers.
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

export default DeletePhotoButton;
