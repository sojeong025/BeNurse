import React from "react";
import { Common } from "../../../utils/global.styles";

import nurse from "@assets/Images/patient_temp.png";

export default function RecentUsageItem() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <p
        style={{
          fontSize: Common.fontSize.fontXXS,
          color: Common.color.purple04,
        }}
      >
        08:20
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "220px",
        }}
      >
        <img
          style={{
            height: "48px",
            border: "1px solid gray",
            borderRadius: "50px",
          }}
          src={nurse}
          alt=""
        />
        <div
          style={{
            fontSize: Common.fontSize.fontXS,
            marginLeft: "12px",
          }}
        >
          <p
            style={{
              fontWeight: Common.fontWeight.extrabold,
              marginBottom: "4px",
            }}
          >
            정소정 간호사
          </p>
          <p>내과 A병동 2년차</p>
        </div>
      </div>
      <p
        style={{
          fontSize: Common.fontSize.fontXS,
          fontWeight: Common.fontWeight.bold,
        }}
      >
        김갑수 환자
      </p>
    </div>
  );
}
