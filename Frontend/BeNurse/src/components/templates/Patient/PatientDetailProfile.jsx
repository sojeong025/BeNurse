import React from "react";

// Components
import Box from "@components/atoms/Box/Box";

// Images
import patientImg from "@assets/Images/patient_male.png";

export default function PatientDetailProfile() {
  return (
    <Box
      type={"purple02"}
      margin={"26px 0px 20px 0px"}
      size={["384px", "100px"]}
      font={"16px"}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "342px",
          height: "66px",
        }}
      >
        <img
          src={patientImg}
          style={{ borderRadius: "300px", width: "60px", height: "60px" }}
          alt=""
        />
        <div style={{ width: "255px", height: "60px", marginLeft: "28px" }}>
          DESC
        </div>
      </div>
    </Box>
  );
}
