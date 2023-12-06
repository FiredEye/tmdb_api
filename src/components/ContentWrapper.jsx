import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-[30px]">{children}</div>
  );
};

export default ContentWrapper;
