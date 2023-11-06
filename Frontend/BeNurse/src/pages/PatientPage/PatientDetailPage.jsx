import React, { useEffect, useState } from "react";
import { Common } from "@utils/global.styles.jsx";
import { useParams } from "react-router-dom";
import PatientDetailProfile from "../../components/templates/Patient/PatientDetailProfile";
import PatientDetailHeader from "../../components/templates/Patient/PatientDetailHeader";
import PatientDetailItem from "../../components/templates/Patient/PatientDetailItem";

import { customAxios } from "../../libs/axios";

import * as S from "./PatientDetail.styles";

// Components
import Box from "@components/atoms/Box/Box";

export default function PatientDetailPage() {
  const [patient, setPatient] = useState({
    id: "",
    age: "",
    discharge: "",
    disease: "",
    drinking: "",
    gender: "",
    hospitalization: "",
    surgery: "",
    history: "",
    medicine: "",
    name: "",
    selfmedicine: "",
    smoking: "",
    alergy: "",
    surgery: "",
    cc: [],
  });
  const { patientId } = useParams();

  useEffect(() => {
    customAxios
      .get("emr/patient?id=" + patientId)
      .then((res) => {
        console.log("환자 정보 불러오기", res.data.responseData);
        setPatient({
          ...res.data.responseData.patient,
          cc: res.data.responseData.cc,
        });
      })
      .catch((error) => {
        console.error("환자 정보 로드 실패:", error);
      });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "calc(100% - 28px)",
        marginTop: "74px",
      }}
    >
      <PatientDetailProfile patient={patient} />
      <Box
        flex={["center", "flex-start"]}
        type={"transparent"}
        margin={"0px 0px 20px 0px"}
        size={["384px", "560px"]}
        font={"16px"}
        overflowX={"hidden"}
        overflowY={"scroll"}
      >
        <S.PatientDetailContainer>
          <PatientDetailHeader type="주요내역" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              borderTop: "1px solid #D9D9D9",
            }}
          >
            <S.PatientDetailItemContainer>
              <PatientDetailItem
                name="주호소"
                value={patient.cc.length > 0 ? patient.cc[0].content : ""}
                onChange={(e) => {
                  // TODO: 주호소 수정할 때 어떻게 하지?
                }}
              />
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
            </S.PatientDetailItemContainer>
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
            <S.PatientDetailItemContainer>
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
            </S.PatientDetailItemContainer>
          </div>
        </S.PatientDetailContainer>
      </Box>
    </div>
  );
}
