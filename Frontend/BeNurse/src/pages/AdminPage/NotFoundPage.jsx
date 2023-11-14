import React from "react";
import { Common } from "../../utils/global.styles";
import NotFound from "@assets/Images/not_found.png";
import Box from "../../components/atoms/Box/Box";

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
        backgroundColor: Common.color.purple00,
      }}
    >
      <img
        style={{ width: "404px" }}
        src={NotFound}
        alt=""
      />
    </div>
  );
}
