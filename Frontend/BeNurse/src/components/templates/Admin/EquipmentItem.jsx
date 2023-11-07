import React from "react";
import { Common } from "../../../utils/global.styles";

export default function EquipmentItem({ item }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "60px",
        border: "1px solid red",
        padding: "20px",
        boxSizing: "border-box",
        transition: "all 0.2s",
      }}
    >
      {item.name}
    </div>
  );
}
