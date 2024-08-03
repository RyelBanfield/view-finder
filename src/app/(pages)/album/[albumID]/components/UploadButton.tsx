"use client";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

import { Session } from "@supabase/supabase-js";
import Compressor from "@uppy/compressor";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { fetchBase64ForPhoto, insertPhotos } from "@/app/actions/photoActions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "@/utils/supabase/client";

const UploadButton = ({
  albumID,
  numberOfPhotosUserCanUpload,
}: {
  albumID: string;
  numberOfPhotosUserCanUpload: number;
}) => {
  const router = useRouter();
  const supabase = createClient();

  const [session, setSession] = useState<Session | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const getSession = supabase.auth
      .getSession()
      .then(({ data }) => data.session);
    getSession.then((session) => setSession(session));
  }, [supabase.auth]);

  const uppy = new Uppy()
    .use(Tus, {
      endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${session?.access_token}`,
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      chunkSize: 6 * 1024 * 1024,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
    .use(Compressor, {
      quality: 0.8,
    });

  uppy.setOptions({
    restrictions: {
      maxNumberOfFiles: Math.min(numberOfPhotosUserCanUpload, 10),
    },
  });

  uppy.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: "photos",
      objectName: `${session!.user.id}/${albumID}/${uuidv4()}.${file.extension}`,
      contentType: file.type,
    };
  });

  const postProcessFiles = async (fileIDs: string[]) => {
    const files = fileIDs.map((id) => uppy.getFile(id));

    if (!files.length) return;

    const uploadedPhotos = files.map((file) => ({
      user_id: session!.user.id,
      album_id: albumID,
      file_path: file.meta.objectName as string,
    }));

    const base64FetchPromises = uploadedPhotos.map((photo) =>
      fetchBase64ForPhoto(photo.file_path).then((base64) => ({
        ...photo,
        base64,
      })),
    );

    const uploadedPhotosWithBase64 = await Promise.all(base64FetchPromises);

    await insertPhotos(uploadedPhotosWithBase64);
  };

  uppy.addPostProcessor(postProcessFiles);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          size={"sm"}
          variant={"ghost"}
          className="flex w-28 justify-evenly gap-1 text-xs"
        >
          <UploadIcon className="size-3" />
          Upload
        </Button>
      </SheetTrigger>

      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle className="text-base">Ready to upload?</SheetTitle>
          <SheetDescription className="text-xs">
            This will add photos to this public album.
          </SheetDescription>
        </SheetHeader>

        <br />

        <div className="md:flex md:justify-center">
          <Dashboard
            uppy={uppy}
            showProgressDetails={true}
            waitForThumbnailsBeforeUpload
            proudlyDisplayPoweredByUppy={false}
            doneButtonHandler={() => {
              setSheetOpen(false);
              router.refresh();
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UploadButton;
