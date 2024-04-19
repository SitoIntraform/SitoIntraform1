import Image from "next/image";
import React from "react";

function PageNotFound() {
  return (
    <div className="h-[calc(100vh-80px)] w-full pt-[80px] !max-w-[100%] !overflow-x-hidden">
      <div className="h-full w-full flex flex-col items-center justify-center gap-5">
        <Image src={"/logo.jpg"} alt="Logo" width={300} height={300} />
        <div className="h4Desktop text-center">Pagina non trovata</div>
      </div>
    </div>
  );
}

export default PageNotFound;
