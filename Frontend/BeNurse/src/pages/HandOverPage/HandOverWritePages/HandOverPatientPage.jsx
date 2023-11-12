import React, { useEffect, useState } from "react";
import PatientDetailHeader from "@components/templates/Patient/PatientDetailHeader";
import PatientDetailItem from "@components/templates/Patient/PatientDetailItem";
import PatientDetailProfile from "@components/templates/Patient/PatientDetailProfile";
import {
  PatientDetailContainer,
  PatientDetailItemContainer,
} from "@pages/PatientPage/PatientDetail.styles.jsx";
import { customAxios } from "../../../libs/axios";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@components/atoms/Container/Container";
import Button from "@components/atoms/Button/Button";
import { useHandoverSetStore, usePatientCardStore } from "../../../store/store";

export default function HandOverPatientPage() {
  const {
    handoverCC,
    setHandoverCC,
    handoverEtc,
    setHandoverEtc,
    handoverId,
    setHandoverId,
    handoverJournals,
    setHandoverJournals,
    handoverPatientId,
    setHandoverPatientId,
    handoverSpecial,
    setHandoverSpecial,
    handoverSetId,
    setHandoverSetId,
    setHandoverJournalList,
  } = useHandoverSetStore((state) => state);
  const { setCompletedHandover } = usePatientCardStore((state) => state);
  const [patient, setPatient] = useState({});
  const { patientId } = useParams();
  const navigate = useNavigate();

  const handlePatientCardClick = () => {
    customAxios.get("HandoverSet/details?ID=" + handoverSetId).then((res) => {
      if (
        res.data.responseData.filter(
          (item) => item.patientID.toString() === patientId,
        ).length > 0
      ) {
        setHandoverId(
          res.data.responseData.filter(
            (item) => item.patientID.toString() === patientId,
          )[0].id,
        );
        setHandoverPatientId(patientId);
        setHandoverJournals(
          () =>
            res.data.responseData.filter(
              (item) => item.patientID.toString() === patientId,
            )[0].journals,
        );
        navigate("/handover-write/" + patientId + "/patients/write");
      } else {
        const data = {
          handover: {
            cc: [],
            etc: [],
            id: 0,
            journals: [
              {
                comment: "",
                journalID: 0,
              },
            ],
            patientID: patientId,
            special: [],
          },
          setID: handoverSetId,
        };
        customAxios.post("Handover", data).then((res) => {
          setHandoverId(res.data.responseData.id);
          setHandoverPatientId(patientId);
          setHandoverJournals(() => []);
          console.log("환자 인계장 생성 완료");
          navigate("/handover-write/" + patientId + "/patients/write");
        });
      }
    });
  };

  useEffect(() => {
    customAxios
      .get("emr/patient?id=" + patientId)
      .then((res) => {
        setPatient({
          ...res.data.responseData.patient.patient,
        });
      })
      .catch((error) => {});
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
        <PatientDetailProfile
          patient={patient}
          isHandOver={true}
        />
        <PatientDetailContainer
          style={{
            width: "100%",
            height: "520px",
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
                readonly={true}
              />
              <PatientDetailItem
                name="수술명"
                value={patient.surgery}
                readonly={true}
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
                readonly={true}
              />
              <PatientDetailItem
                name="투약"
                value={patient.medicine}
                readonly={true}
              />
              <PatientDetailItem
                name="음주"
                value={patient.drinking}
                readonly={true}
              />
              <PatientDetailItem
                name="흡연"
                value={patient.smoking}
                readonly={true}
              />
              <PatientDetailItem
                name="알레르기"
                value={patient.alergy}
                readonly={true}
              />
              <PatientDetailItem
                name="자가약"
                value={patient.selfmedicine}
                readonly={true}
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
            onClick={handlePatientCardClick}
          >
            인계장 작성
          </Button>
        </div>
      </div>
    </Container>
  );
}
