import React from "react";
import { Common } from "@utils/global.styles.jsx";
import { Navigate } from "react-router-dom";

// Comoponents
import Box from "@components/atoms/Box/Box";

// Images
import patientImg from "@assets/Images/patient_male.png";
import { BsPlusCircleFill } from "react-icons/bs";

export default function PatientItem({ type }) {
  if (type === "patient") {
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
          <p style={{ fontSize: Common.fontSize.fontXXS }}>내과 3동 B302</p>
          <img
            src={patientImg}
            style={{ borderRadius: "300px", width: "60px" }}
            alt=""
          />
          <p
            style={{
              fontSize: Common.fontSize.fontS,
              fontWeight: Common.fontWeight.extrabold,
            }}
          >
            종박사
          </p>
          <p
            style={{
              fontSize: Common.fontSize.fontS,
              fontWeight: Common.fontWeight.regular,
            }}
          >
            다리 외상
          </p>
        </div>
      </Box>
    );
  } else {
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
            height: "50%",
          }}
        >
          <div>
            <BsPlusCircleFill size={40} />
          </div>
          <div>환자 추가</div>
        </div>
      </Box>
    );
  }
}
