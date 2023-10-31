import React from "react";
import { Common } from "@utils/global.styles.jsx";

export default function PatientDetailItem({ name }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "364px",
        gap: "10px",
      }}
    >
      <div
        style={{
          width: "85px",
          color: Common.color.black02,
          fontSize: Common.fontSize.fontS,
          fontWeight: Common.fontWeight.bold,
        }}
      >
        {name}
      </div>
      <input
        style={{
          width: "100%",
          height: "44px",
          border: "1px solid #8C8C8C",
          borderRadius: "6px",
          outline: "none",
          paddingLeft: "10px",
          boxSizing: "border-box",
        }}
        type="text"
        variant={"default"}
      />
    </div>
  );
}
