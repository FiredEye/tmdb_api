import React from "react";
import ContentWrapper from "./ContentWrapper";

const Error = ({ error }) => {
  return (
    <ContentWrapper>
      <h1 className="text-red-500 text-center text-[24px] font-[600]">
        {error?.data?.status_message}
      </h1>
    </ContentWrapper>
  );
};

export default Error;
