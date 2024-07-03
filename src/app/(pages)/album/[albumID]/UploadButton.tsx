"use client";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

import { Session } from "@supabase/supabase-js";
import Compressor from "@uppy/compressor";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

const UploadButton = ({ albumID }: { albumID: string }) => {
  const supabase = createClient();

  const [session, setSession] = useState<Session | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const getSession = supabase.auth
      .getSession()
      .then(({ data }) => data.session);
    getSession.then((session) => setSession(session));
  }, []);

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
    .use(Compressor);

  uppy.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: "photos",
      objectName: `${session!.user.id}/${albumID}/${uuidv4()}.${file.extension}`,
      contentType: file.type,
    };
  });

  uppy.on("complete", (result) => {
    console.log(
      "Upload complete! We’ve uploaded these files:",
      result.successful,
    );
  });

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button size={"sm"} className="w-full">
          Upload Photos
        </Button>
      </SheetTrigger>

      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Ready to upload?</SheetTitle>
          <SheetDescription>
            This will add photos to this public album.
          </SheetDescription>
        </SheetHeader>

        <br />

        <Dashboard
          uppy={uppy}
          showProgressDetails={true}
          waitForThumbnailsBeforeUpload
          proudlyDisplayPoweredByUppy={false}
          doneButtonHandler={async () => {
            setSheetOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default UploadButton;
