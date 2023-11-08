import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Input from "@components/atoms/Input/Input";
import PatientItem from "@components/templates/Patient/PatientItem";
import PatientFilterSelect from "@components/templates/Patient/PatientFilterSelect";
import empty from "@assets/Images/empty.png";
import loader from "@assets/Images/loader.gif";

import { Common } from "@utils/global.styles.jsx";

import { usePatientStore } from "@store/store";
import { customAxios } from "../../libs/axios";

export default function PatientListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState();
  const { setSelectedPatient } = usePatientStore();

  useEffect(() => {
    customAxios
      .get("emr/patient/all")
      .then((res) => {
        console.log("환자 목록 불러오기", res.data.responseData);
        setPatients(res.data.responseData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("환자 목록 로드 실패:", error);
      });
    setSelectedPatient({});
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "386px",
        marginTop: "84px",
      }}
    >
      <div
        style={{
          background: `${Common.color.purple00}`,
          position: "absolute",
          top: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: `0px 0px 10px 10px ${Common.color.purple00} `,
          zIndex: "1",
        }}
      >
        <Input
          width={"356px"}
          variant={"search"}
          placeholder={"환자 이름으로 검색"}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingBottom: "50px",
          marginTop: "65px",
          paddingTop: "20px",
          height: "636px",
          overflow: "scroll",
          gap: "15px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          {isLoading ? (
            <div
              style={{
                width: "100%",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                opacity: "0.5",
                fontSize: `${Common.fontSize.fontS}`,
              }}
            >
              <img
                src={loader}
                alt=""
                width="60px"
                height="60px"
              />
            </div>
          ) : patients ? (
            patients.map((patientInfo) => (
              <NavLink
                to={patientInfo.patient.patient.id + "/detail"}
                key={patientInfo.patient.patient.id}
                onClick={() =>
                  setSelectedPatient({
                    ...patientInfo.patient.patient,
                  })
                }
              >
                <PatientItem
                  type="patient"
                  patientInfo={{
                    ...patientInfo.patient.patient,
                    ward: patientInfo.ward.name,
                  }}
                />
              </NavLink>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                opacity: "0.5",
                fontSize: `${Common.fontSize.fontS}`,
              }}
            >
              <img
                src={empty}
                alt=""
                width="150px"
                height="150px"
              />
              <p>등록된 환자가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
