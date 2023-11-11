import React from "react";
import { NavLink } from "react-router-dom";
import { Common } from "@utils/global.styles.jsx";

import * as S from "./PatientDetailProfile.styles";

// Components
import Box from "@components/atoms/Box/Box";
import PatientImages from "./PatientImages";

// Icons
import schedule from "@assets/Icons/schedule.svg";
import { PiNotepad } from "react-icons/pi";

import moment from "moment";
import { useDateStore } from "../../../store/store";

export default function PatientDetailProfile({ patient, isHandOver }) {
  const { setSelectedDate } = useDateStore((state) => state);
  return (
    <Box
      type={"purple02"}
      margin={"20px 0px 20px 0px"}
      size={["100%", "100px"]}
      font={"16px"}
    >
      <S.PatientDetailProfileBox>
        <PatientImages
          age={patient.age}
          gender={patient.gender}
          imgNum={patient.img}
          className="patient_image"
        />

        <div>
          <div>
            <span className="patient_name">{patient.name}</span>
            <span className="patient_ageGen">
              / {patient.age}세 {patient.gender}
            </span>
          </div>

          <div className="patient_info">
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <img
                width="14px"
                src={schedule}
                alt=""
              />
              {patient.hospitalization} 입원
            </div>
          </div>
        </div>
        {isHandOver ? (
          <div style={{ width: "60px" }}></div>
        ) : (
          <NavLink
            to={"/patient/" + patient.id + "/detail/journal"}
            onClick={() => {
              setSelectedDate(moment().startOf("day"));
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: Common.color.white01,
                padding: "10px 7px",
                borderRadius: "10px",
              }}
            >
              <div>
                <PiNotepad size={22} />
              </div>
              <span
                style={{
                  color: Common.color.black02,
                  fontSize: Common.fontSize.fontXS,
                  fontWeight: Common.fontWeight.bold,
                }}
              >
                간호일지
              </span>
            </div>
          </NavLink>
        )}
      </S.PatientDetailProfileBox>
    </Box>
  );
}
