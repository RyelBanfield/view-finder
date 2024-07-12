"use client";

import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="grid grow place-items-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loading;
