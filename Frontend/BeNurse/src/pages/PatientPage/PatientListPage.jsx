import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Input from "@components/atoms/Input/Input";
import PatientItem from "@components/templates/Patient/PatientItem";
import empty from "@assets/Images/empty.png";
import loader from "@assets/Images/loader.gif";

import { Common } from "@utils/global.styles.jsx";

import { usePatientStore } from "@store/store";
import { customAxios } from "../../libs/axios";

export default function PatientListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const { setSelectedPatient } = usePatientStore();
  const [searchingWord, setSearchingWord] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    customAxios
      .get("emr/patient/all")
      .then((res) => {
        const patientsData = res.data.responseData.map((patientData) => {
          return {
            ...patientData.patient.patient,
            ward: patientData.ward.name,
          };
        });
        setPatients(patientsData);
        setFilteredPatients(patientsData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("환자 목록 로드 실패:", error);
      });
    setSelectedPatient({});
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter((patientInfo) =>
        patientInfo.name.includes(searchingWord),
      ),
    );
  }, [searchingWord]);

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
          onChange={(event) => {
            setSearchingWord(event.target.value);
          }}
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
          ) : filteredPatients.length > 0 ? (
            filteredPatients.map((patientInfo) => (
              <NavLink
                to={patientInfo.id + "/detail"}
                key={patientInfo.id}
                onClick={() => setSelectedPatient(patientInfo)}
              >
                <PatientItem
                  type="patient"
                  patientInfo={patientInfo}
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
