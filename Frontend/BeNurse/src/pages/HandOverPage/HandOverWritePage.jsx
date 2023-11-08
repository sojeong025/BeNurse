import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Container from "@components/atoms/Container/Container";
import PatientItem from "@components/templates/Patient/PatientItem";
import Input from "@components/atoms/Input/Input";
import Button from "@components/atoms/Button/Button";
import { customAxios } from "../../libs/axios";

import { Select } from "./HandOverWritePage.styles";

import { usePatientStore } from "@store/store";
import { useWardStore } from "../../store/store";

export default function HandOverWritePage() {
  const navigate = useNavigate();

  const { setSelectedPatient } = usePatientStore();
  const wardId = useWardStore((state) => state.wardId);
  console.log("인계장 작성페이지에서 wardId 체크", wardId);

  useEffect(() => {
    setSelectedPatient({});
  }, []);

  // 전체 인계장 SET 생성 => 인계장 ID 생성
  const [handoversId, setHandoversId] = useState();
  useEffect(() => {
    customAxios.post("HandoverSet").then((res) => {
      console.log("전체 인계장 묶음 ID 생성용", res);
      setHandoversId(res.data.responseData.id);
    });
  }, []);

  // 환자 카드 선택시 인계장 생성
  const handlePatientCardClick = (patientInfo) => {
    setSelectedPatient(patientInfo);

    const handover = {};
    const data = {
      handover: handover,
      setID: handoversId,
    };
    customAxios.post("Handover", data).then((res) => {
      console.log("POST 요청 결과", res);
    });
  };

  const [patientInfo, setPatientInfo] = useState([]);

  useEffect(() => {
    customAxios.get("emr/patient/wardall").then((res) => {
      console.log("병동 내 환자만 조회 결과 확인", res.data.responseData);
      const patientsCard = res.data.responseData.map((patientData) => {
        return {
          ...patientData.patient,
        };
      });
      setPatientInfo(patientsCard);
    });
  }, []);

  const today = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  let day = days[today.getDay()];
  const [currentDate, setCurrentDate] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getDay(),
    ),
  );

  return (
    <Container
      backgroundColor={"purple"}
      flex={["center"]}
    >
      <div
        style={{
          position: "relative",
          marginTop: "30px",
          paddingTop: "74px",
          width: "calc(100% - 28px)",
        }}
      >
        <div>
          {/* 인수인계 대상자(환자) 선택하기 */}
          <Select>
            <div className="header">
              <h1 className="title">인계 환자 선택하기</h1>
              <p>
                {currentDate.getFullYear()}.{currentDate.getMonth() + 1}.
                {String(currentDate.getDate()).padStart(2, "0")} ({day}) 인계장
              </p>
            </div>
            <div>
              <Input
                variant={"search"}
                placeholder={"환자 이름으로 검색"}
              />
            </div>
          </Select>

          <div
            style={{
              width: "100%",
              height: "550px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "9px",
              overflowY: "auto",
              paddingBottom: "40px",
              boxSizing: "border-box",
            }}
          >
            {patientInfo.map((patientInfo) => (
              <NavLink
                to={patientInfo.id + "/patients/write"}
                key={patientInfo.id}
                onClick={handlePatientCardClick}
              >
                <PatientItem
                  type="handoverpatient"
                  patientInfo={patientInfo}
                />
              </NavLink>
            ))}
          </div>
        </div>

        {/* 인수자 선택
        - 환자가 최소 1명 이상 선택되었을 경우 뜨도록
      */}
        <div
          style={{
            position: "absolute",
            top: "720px",
            width: "100%",
          }}
        >
          <Button
            width="100%"
            variant="primary"
            onClick={() => navigate("nurse")}
          >
            인수자 선택
          </Button>
        </div>
      </div>
    </Container>
  );
}
