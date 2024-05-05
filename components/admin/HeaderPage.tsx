"use client";

import React from "react";

function HeaderPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-[20px] flex md:flex-row flex-col items-center justify-between border-b border-textDesign pb-4">
      <div className="flex-col pb-5 md:pb-0">
        <h1 className="h4Mobile md:h4Desktop xl:h3Desktop text-center md:text-left">
          {title}
        </h1>
        <p className="small-normal md:regular-normal text-center md:text-left">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

export default HeaderPage;
