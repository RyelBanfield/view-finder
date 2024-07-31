"use client";

import { Share2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const SharePhotoButton = ({ baseURL }: { baseURL: string }) => {
  const pathname = usePathname();

  const handleShare = async () => {
    await navigator.clipboard.writeText(`${baseURL.slice(0, -1)}${pathname}`);

    toast("Link to photo copied", {
      description: "You can go paste it somewhere!",
    });
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleShare}>
      <Share2Icon className="size-3" />
    </Button>
  );
};

export default SharePhotoButton;
