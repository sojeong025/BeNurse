import React, { useEffect, useState } from "react";
import PatientDetailHeader from "@components/templates/Patient/PatientDetailHeader";
import PatientDetailItem from "@components/templates/Patient/PatientDetailItem";
import PatientDetailProfile from "@components/templates/Patient/PatientDetailProfile";
import {
  PatientDetailContainer,
  PatientDetailItemContainer,
} from "@pages/PatientPage/PatientDetail.styles.jsx";
import { customAxios } from "../../../libs/axios";
import { useParams } from "react-router-dom";

export default function HandOverDetailInfo() {
  const [patient, setPatient] = useState({});
  const { patientId } = useParams();

  useEffect(() => {
    customAxios
      .get("emr/patient?id=" + patientId)
      .then((res) => {
        setPatient({
          ...res.data.responseData.patient.patient,
        });
      })
      .catch((error) => {
        console.error("환자 정보 로드 실패:", error);
      });
  }, []);

  return (
    <div style={{ width: "calc(100% - 28px)", margin: "0 auto" }}>
      <PatientDetailProfile patient={patient} />
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
            <PatientDetailItem
              name="진단명"
              value={patient.disease}
              onChange={(e) => {
                setPatient({ ...patient, disease: e.target.value });
              }}
            />
            <PatientDetailItem
              name="수술명"
              value={patient.surgery}
              onChange={(e) => {
                setPatient({ ...patient, surgery: e.target.value });
              }}
            />
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
            <PatientDetailItem
              name="병증이력"
              value={patient.history}
              onChange={(e) => {
                setPatient({ ...patient, history: e.target.value });
              }}
            />
            <PatientDetailItem
              name="투약"
              value={patient.medicine}
              onChange={(e) => {
                setPatient({ ...patient, medicine: e.target.value });
              }}
            />
            <PatientDetailItem
              name="음주"
              value={patient.drinking}
              onChange={(e) => {
                setPatient({ ...patient, drinking: e.target.value });
              }}
            />
            <PatientDetailItem
              name="흡연"
              value={patient.smoking}
              onChange={(e) => {
                setPatient({ ...patient, smoking: e.target.value });
              }}
            />
            <PatientDetailItem
              name="알레르기"
              value={patient.alergy}
              onChange={(e) => {
                setPatient({ ...patient, alergy: e.target.value });
              }}
            />
            <PatientDetailItem
              name="자가약"
              value={patient.selfmedicine}
              onChange={(e) => {
                setPatient({ ...patient, selfmedicine: e.target.value });
              }}
            />
          </PatientDetailItemContainer>
        </div>
      </PatientDetailContainer>
    </div>
  );
}
