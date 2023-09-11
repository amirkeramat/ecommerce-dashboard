import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-full">{children}</div>
  );
};

export default layout;
