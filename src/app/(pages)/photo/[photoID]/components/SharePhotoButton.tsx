"use client";

import { Share2Icon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SharePhotoButton = ({ baseURL }: { baseURL: string }) => {
  const { toast } = useToast();
  const pathname = usePathname();

  const handleShare = async () => {
    await navigator.clipboard.writeText(`${baseURL.slice(0, -1)}${pathname}`);

    toast({
      title: "Link copied",
      description: "Share this photo with your friends!",
    });
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleShare}>
      <Share2Icon className="size-4" />
    </Button>
  );
};

export default SharePhotoButton;
