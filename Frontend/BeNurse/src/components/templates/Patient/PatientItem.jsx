import React from "react";
import { Common } from "@utils/global.styles.jsx";
import { Navigate } from "react-router-dom";
import { BsCalendarPlus } from "react-icons/bs";

// Comoponents
import Box from "@components/atoms/Box/Box";
import PatientImages from "./PatientImages";

// Images
import patientImg from "@assets/Images/patient_male.png";

export default function PatientItem({ type, patientInfo }) {
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
        <p
          style={{
            fontSize: Common.fontSize.fontXXS,
            fontWeight: Common.fontWeight.bold,
            wordSpacing: type === "patient" ? "0px" : "-3px",
            display: "flex",
          }}
        >
          {type === "patient" ? (
            patientInfo.ward
          ) : (
            <>
              <BsCalendarPlus
                style={{
                  marginRight: "5px",
                }}
              />
              {` ${new Date(patientInfo.hospitalization).toLocaleDateString(
                "ko-KR",
                {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                },
              )}`}
            </>
          )}
        </p>

        <PatientImages
          age={patientInfo.age}
          gender={patientInfo.gender}
          imgNum={patientInfo.img}
          style={{ borderRadius: "300px", width: "60px" }}
        />
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
            fontWeight: Common.fontWeight.bold,
          }}
        >
          {patientInfo.gender} {patientInfo.age}세
        </p>
      </div>
    </Box>
  );
}
