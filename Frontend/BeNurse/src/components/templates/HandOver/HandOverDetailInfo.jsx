import React from "react";
import { useNavigate } from "react-router-dom";
import PatientDetailHeader from "@components/templates/Patient/PatientDetailHeader";
import PatientDetailItem from "@components/templates/Patient/PatientDetailItem";
import PatientDetailProfile from "@components/templates/Patient/PatientDetailProfile";
import {
  PatientDetailContainer,
  PatientDetailItemContainer,
} from "@pages/PatientPage/PatientDetail.styles.jsx";

import BottomButton from "@components/atoms/Button/BottomButton";

export default function HandOverDetailInfo() {
  const navigate = useNavigate();
  const nextStep = () => {
    navigate("dosage");
  };

  return (
    <div>
      <PatientDetailProfile />
      <PatientDetailContainer
        style={{
          overflowY: "scroll",
          marginLeft: "-14px",
          width: "400px",
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
        <BottomButton onNextClick={nextStep} />
      </PatientDetailContainer>
    </div>
  );
}
