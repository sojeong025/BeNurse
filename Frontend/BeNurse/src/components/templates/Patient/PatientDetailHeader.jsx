import React from "react";
import { NavLink } from "react-router-dom";
import { Common } from "@utils/global.styles";

// Icons
import { MdHistory } from "react-icons/md";

export default function PatientDetailHeader({ type }) {
  if (type === "주요내역") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "382px",
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
        <NavLink to="journal">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                color: Common.color.black02,
                fontSize: Common.fontSize.fontXS,
                fontWeight: Common.fontWeight.bold,
              }}
            >
              간호일지 보기
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "4px",
                width: "40px",
                height: "40px",
                borderRadius: "40px",
                backgroundColor: Common.color.purple02,
              }}
            >
              <MdHistory
                style={{ marginLeft: "9px" }}
                size={22}
              />
            </div>
          </div>
        </NavLink>
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
