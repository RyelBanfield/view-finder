"use client";

import { deleteAlbumAndPhotos } from "@/app/actions/albumActions";
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

const DeleteAlbumButton = ({
  albumID,
  photos,
}: {
  albumID: string;
  photos: Tables<"photos">[] | null;
}) => {
  const handleDelete = () => {
    deleteAlbumAndPhotos(albumID, photos);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"outline"} className="w-24 text-xs">
          Delete Album
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            This action cannot be undone. This will permanently delete your
            album and remove it from our servers.
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

export default DeleteAlbumButton;
