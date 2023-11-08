import React, { useEffect, useState } from "react";
import PatientDetailHeader from "@components/templates/Patient/PatientDetailHeader";
import PatientDetailItem from "@components/templates/Patient/PatientDetailItem";
import PatientDetailProfile from "@components/templates/Patient/PatientDetailProfile";
import {
  PatientDetailContainer,
  PatientDetailItemContainer,
} from "@pages/PatientPage/PatientDetail.styles.jsx";
import { customAxios } from "../../libs/axios";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@components/atoms/Container/Container";
import Button from "@components/atoms/Button/Button";
import { usePatientStore } from "@store/store";

export default function HandOverPatientPage() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const { patientId } = useParams();
  console.log("환자ID", patientId);

  useEffect(() => {
    customAxios
      .get("emr/patient?id=" + patientId)
      .then((res) => {
        console.log("인수인계 환자 정보 불러오기", res.data.responseData);
        setPatient({
          ...res.data.responseData.patient.patient,
        });
      })
      .catch((error) => {
        console.error("환자 정보 로드 실패:", error);
      });
  }, []);

  return (
    <Container
      backgroundColor={"white"}
      flex={["center"]}
    >
      <div
        style={{
          position: "relative",
          width: "calc(100% - 28px)",
          paddingTop: "74px",
          margin: "10px auto",
        }}
      >
        <PatientDetailProfile patient={patient} />
        <PatientDetailContainer
          style={{
            width: "100%",
            height: "500px",
            overflowY: "auto",
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
        <div
          style={{
            position: "absolute",
            top: "740px",
            width: "100%",
          }}
        >
          <Button
            width="100%"
            variant="primary"
            onClick={() =>
              navigate("/handover-write/" + patientId + "/patients/write")
            }
          >
            인계장 작성
          </Button>
        </div>
      </div>
    </Container>
  );
}
