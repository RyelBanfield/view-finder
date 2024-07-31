"use client";

import { TrashIcon } from "lucide-react";

import { deletePhotoAndRedirectToAlbum } from "@/app/actions/photoActions";
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
    deletePhotoAndRedirectToAlbum(photoID, albumID, filePath);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <TrashIcon className="size-3" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            This action cannot be undone. This will permanently delete your
            photo and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="text-xs">
            Delete Permanently
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePhotoButton;
