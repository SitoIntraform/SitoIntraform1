import { Loader, Loader2, LoaderCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="h-screen w-screen relative">
      <div className="containerDesign h-full flex flex-col items-center justify-center gap-10">
        <Image
          src={"/logo.jpg"}
          width={400}
          height={400}
          alt="Logo"
          
        />
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    </div>
  );
}

export default Loading;
