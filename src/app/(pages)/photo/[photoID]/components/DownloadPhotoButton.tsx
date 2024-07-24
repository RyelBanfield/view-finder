"use client";

import { DownloadIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { fetchPublicPhotoURL } from "@/app/actions/photoActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DownloadPhotoButton = ({ filePath }: { filePath: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDownload = async () => {
    const publicPhotoURL = await fetchPublicPhotoURL(filePath);

    if (!publicPhotoURL) {
      toast({
        title: "There was an error",
        description: "The photo could not be downloaded.",
        variant: "destructive",
      });

      return;
    }

    router.push(publicPhotoURL);

    toast({
      title: "Photo downloaded",
      description: "Check your downloads folder.",
    });
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleDownload}>
      <DownloadIcon className="size-4" />
    </Button>
  );
};

export default DownloadPhotoButton;
