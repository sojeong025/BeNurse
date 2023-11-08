import React from "react";
import { Common } from "@utils/global.styles.jsx";

// Comoponents
import Box from "@components/atoms/Box/Box";
import PatientImages from "./PatientImages";

export default function PatientItem({ patientInfo }) {
  return (
    <Box
      type={"white"}
      size={["102px", "140px"]}
      padding={"14px 10px"}
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
        <>
          <p style={{ fontSize: Common.fontSize.fontXXS }}>
            {patientInfo.ward}
          </p>
          <div
            style={{
              height: "60px",
              width: "60px",
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <PatientImages
              age={patientInfo.age}
              gender={patientInfo.gender}
              imgNum={patientInfo.img}
              style={{
                borderRadius: "300px",
                width: "60px",
                objectFit: "cover",
              }}
            />
          </div>

          <p
            style={{
              fontSize: Common.fontSize.fontS,
              fontWeight: Common.fontWeight.extrabold,
            }}
          >
            {patientInfo.name}
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: Common.fontSize.fontS,
              fontWeight: Common.fontWeight.regular,
            }}
          >
            {patientInfo.gender} {patientInfo.age}세
          </p>
        </>
      </div>
    </Box>
  );
}
