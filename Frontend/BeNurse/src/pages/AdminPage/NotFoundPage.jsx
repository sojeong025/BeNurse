import React from "react";
import { Common } from "../../utils/global.styles";

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
        backgroundColor: Common.color.purple00,
      }}
    >
      NotFoundPage
    </div>
  );
}
