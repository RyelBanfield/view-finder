"use client";

import { Share2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const ShareAlbumButton = ({ baseURL }: { baseURL: string }) => {
  const pathname = usePathname();

  const handleShare = async () => {
    await navigator.clipboard.writeText(`${baseURL.slice(0, -1)}${pathname}`);

    toast("Link to album copied", {
      description: "You can go paste it somewhere!",
    });
  };

  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      onClick={handleShare}
      className="flex w-28 justify-evenly gap-1 text-xs"
    >
      <Share2Icon className="size-3" />
      Share
    </Button>
  );
};

export default ShareAlbumButton;
