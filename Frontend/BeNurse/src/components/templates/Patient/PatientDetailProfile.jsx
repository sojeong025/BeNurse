import React from "react";
import { Common } from "@utils/global.styles.jsx";

import * as S from "./PatientDetailProfile.styles";

// Components
import Box from "@components/atoms/Box/Box";

// Images
import patientImg from "@assets/Images/patient_male.png";

// Icons
import schedule from "@assets/Icons/schedule.svg";

// Store
import { usePatientStore } from "@store/store";

export default function PatientDetailProfile() {
  const { selectedPatient } = usePatientStore((state) => state);

  return (
    <Box
      type={"purple02"}
      margin={"20px 0px 20px 0px"}
      size={["100%", "100px"]}
      font={"16px"}
    >
      <S.PatientDetailProfileBox>
        <img
          className="patient_image"
          src={patientImg}
          alt=""
        />

        <div>
          <div>
            <span className="patient_name">{selectedPatient.name}</span>
            <span className="patient_ageGen">
              / {selectedPatient.age}세 {selectedPatient.gender}
            </span>
          </div>

          <div className="patient_info">
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <img
                width="14px"
                src={schedule}
                alt=""
              />
              2023.10.19 입원
            </div>

            <div style={{ marginLeft: "12px" }}>담당 간호사 박삼성</div>
          </div>
        </div>
      </S.PatientDetailProfileBox>
    </Box>
  );
}
