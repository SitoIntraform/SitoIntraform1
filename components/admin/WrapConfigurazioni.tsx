import React from "react";

function WrapConfigurazioni({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[16px]">{children}</div>
  );
}

export default WrapConfigurazioni;
