"use client";

import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex grow items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loading;
