import React from "react";
import { Common } from "@utils/global.styles.jsx";

// Comoponents
import Box from "@components/atoms/Box/Box";

// Images
import patientImg from "@assets/Images/patient_male.png";

export default function PatientItem({ type }) {
  return (
    <Box
      type={"white"}
      size={["180px", "188px"]}
      margin={"0px 0px 18px 0px"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "140px",
        }}
      >
        <p>내과 3동 B302</p>
        <img
          src={patientImg}
          style={{ borderRadius: "300px" }}
          alt=""
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
            gap: "7px",
          }}
        >
          <span
            style={{
              fontSize: Common.fontSize.fontS,
              fontWeight: Common.fontWeight.extrabold,
            }}
          >
            종박사 남 52
          </span>
          <span
            style={{
              fontSize: Common.fontSize.fontS,
              fontWeight: Common.fontWeight.regular,
            }}
          >
            다리 외상
          </span>
        </div>
      </div>
    </Box>
  );
}
