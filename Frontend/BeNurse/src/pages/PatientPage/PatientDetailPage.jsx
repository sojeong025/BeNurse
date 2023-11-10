import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientDetailProfile from "../../components/templates/Patient/PatientDetailProfile";
import PatientDetailHeader from "../../components/templates/Patient/PatientDetailHeader";
import PatientDetailItem from "../../components/templates/Patient/PatientDetailItem";
import NavBar from "../../components/templates/NavBar/NavBar";

import { customAxios } from "../../libs/axios";

import toast, { Toaster } from "react-hot-toast";

import * as S from "./PatientDetail.styles";

// Components
import Box from "@components/atoms/Box/Box";

import search_loading from "@assets/Images/search_loading.gif";

export default function PatientDetailPage() {
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { patientId } = useParams();

  useEffect(() => {
    customAxios
      .get("emr/patient?id=" + patientId)
      .then((res) => {
        console.log("환자 정보 불러오기", res.data.responseData);
        setPatient({
          ...res.data.responseData.patient.patient,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("환자 정보 로드 실패:", error);
      });
  }, []);

  const onSave = () => {
    for (let key in patient) {
      if (patient[key] === "") {
        toast("모든 항목을 입력해주세요.", {
          position: "bottom-center",
          icon: "⚠️",
          duration: 1500,
          style: {
            fontSize: "14px",
            borderRadius: "40px",
            background: "#000000d1",
            color: "#fff",
          },
        });
        return;
      }
    }

    customAxios
      .put(`emr`, patient)
      .then((res) => {
        console.log("환자 정보 저장 성공:", res.data);
        toast("환자 정보를 수정했어요.", {
          position: "bottom-center",
          icon: "✅",
          duration: 1500,
          style: {
            fontSize: "14px",
            borderRadius: "40px",
            background: "#000000d1",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        console.error("환자 정보 저장 실패:", error);
      });
  };

  return (
    <>
      <Toaster />
      <NavBar onSave={onSave} />
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            width="120px"
            height="120px"
            src={search_loading}
            alt=""
          />
        </div>
      ) : (
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
                    value={patient.ccMain}
                    onChange={(e) => {
                      setPatient({ ...patient, ccMain: e.target.value });
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
      )}
    </>
  );
}
