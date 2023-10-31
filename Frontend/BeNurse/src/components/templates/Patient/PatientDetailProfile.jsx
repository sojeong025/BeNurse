import React from "react";
import { Common } from "@utils/global.styles.jsx";

// Components
import Box from "@components/atoms/Box/Box";

// Images
import patientImg from "@assets/Images/patient_male.png";

// Icons
import schedule from "@assets/Icons/schedule.svg";

export default function PatientDetailProfile() {
  return (
    <Box
      type={"purple02"}
      margin={"20px 0px 20px 0px"}
      size={["100%", "100px"]}
      font={"16px"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src={patientImg}
          style={{ borderRadius: "300px", width: "60px", height: "60px" }}
          alt=""
        />
        <div>
          <span style={{ fontWeight: Common.fontWeight.extrabold }}>
            김싸피
          </span>
          <span
            style={{
              fontSize: Common.fontSize.fontS,
              fontWeight: Common.fontWeight.bold,
            }}
          >
            / 52세 남
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ marginRight: "4px", width: "14px" }}
                src={schedule}
                alt=""
              />
              <span
                style={{
                  fontSize: Common.fontSize.fontXS,
                  fontWeight: Common.fontWeight.bold,
                }}
              >
                2023.10.19 입원
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "12px",
              }}
            >
              <span
                style={{
                  fontSize: Common.fontSize.fontXS,
                  fontWeight: Common.fontWeight.bold,
                }}
              >
                담당 간호사 박삼성
              </span>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
