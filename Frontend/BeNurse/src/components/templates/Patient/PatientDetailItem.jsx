import React from "react";
import { Common } from "@utils/global.styles.jsx";

export default function PatientDetailItem({ name }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "362px",
        margin: "0px 0px 10px 14px",
      }}
    >
      <span
        style={{
          color: Common.color.black02,
          fontSize: Common.fontSize.fontM,
          fontWeight: Common.fontWeight.bold,
        }}
      >
        {name}
      </span>
      <input
        style={{
          width: "282px",
          height: "44px",
          border: "1px solid #8C8C8C",
          borderRadius: "6px",
          outline: "none",
        }}
        type="text"
        variant={"default"}
      />
    </div>
  );
}
