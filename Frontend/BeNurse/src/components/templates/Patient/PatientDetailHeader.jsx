import React from "react";

import { Common } from "@utils/global.styles";

export default function PatientDetailHeader({ type }) {
  if (type === "주요내역") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "372px",
          height: "40px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            color: Common.color.black02,
            fontSize: Common.fontSize.fontM,
            fontWeight: Common.fontWeight.extrabold,
          }}
        >
          주요 내역
        </span>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "382px",
          height: "40px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            color: Common.color.black02,
            fontSize: Common.fontSize.fontM,
            fontWeight: Common.fontWeight.extrabold,
          }}
        >
          PMH(Past Medical History)
        </span>
      </div>
    );
  }
}
