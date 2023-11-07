import React from "react";
import PatientDetailHeader from "@components/templates/Patient/PatientDetailHeader";
import PatientDetailItem from "@components/templates/Patient/PatientDetailItem";
import PatientDetailProfile from "@components/templates/Patient/PatientDetailProfile";
import {
  PatientDetailContainer,
  PatientDetailItemContainer,
} from "@pages/PatientPage/PatientDetail.styles.jsx";

export default function HandOverDetailInfo() {
  const tempPatient = {
    id: "13",
    age: "25",
    discharge: "",
    disease: "다리 외상",
    drinking: false,
    gender: "여",
    hospitalization: "2023-11-07",
    history: "당뇨",
    medicine: "",
    name: "김이박",
    selfmedicine: "타이레놀",
    smoking: true,
    alergy: "마늘",
    surgery: "다리 수술",
    cc: [{ content: "아파요" }],
  };
  return (
    <div style={{ width: "calc(100% - 28px)", margin: "0 auto" }}>
      <PatientDetailProfile patient={tempPatient} />
      <PatientDetailContainer
        style={{
          overflowY: "scroll",
          width: "100%",
          height: "470px",
        }}
      >
        <PatientDetailHeader type="주요내역" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            borderTop: "1px solid #D9D9D9",
          }}
        >
          <PatientDetailItemContainer>
            <PatientDetailItem name="진단명" />
            <PatientDetailItem name="수술명" />
          </PatientDetailItemContainer>
        </div>
        <PatientDetailHeader type="" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            borderTop: "1px solid #D9D9D9",
          }}
        >
          <PatientDetailItemContainer>
            <PatientDetailItem name="병증이력" />
            <PatientDetailItem name="투약" />
            <PatientDetailItem name="음주" />
            <PatientDetailItem name="흡연" />
            <PatientDetailItem name="알레르기" />
          </PatientDetailItemContainer>
        </div>
      </PatientDetailContainer>
    </div>
  );
}
