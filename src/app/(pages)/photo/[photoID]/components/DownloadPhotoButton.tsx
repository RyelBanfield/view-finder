"use client";

import { DownloadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast as sonnerToast } from "sonner";

import {
  fetchPublicPhotoURL,
  incrementPhotoDownloads,
} from "@/app/actions/photoActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/lib/database.types";

const DownloadPhotoButton = ({ photo }: { photo: Tables<"photos"> }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDownload = async () => {
    const publicPhotoURL = await fetchPublicPhotoURL(photo.file_path);

    if (!publicPhotoURL) {
      toast({
        title: "There was an error",
        description: "The photo could not be downloaded.",
        variant: "destructive",
      });

      return;
    }

    router.push(publicPhotoURL);

    sonnerToast("Photo downloaded", {
      description: "Check your downloads folder!",
    });

    await incrementPhotoDownloads(photo.id, photo.downloads);
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleDownload}>
      <DownloadIcon className="size-4" />
    </Button>
  );
};

export default DownloadPhotoButton;
