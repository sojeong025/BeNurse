import React, { useEffect, useState } from "react";
import { Common } from "@utils/global.styles.jsx";
import { BsCalendarPlus } from "react-icons/bs";
import { usePatientCardStore } from "../../../store/store";
import { customAxios } from "../../../libs/axios";
import { useHandoverSetStore } from "../../../store/store";

// Comoponents
import Box from "@components/atoms/Box/Box";
import PatientImages from "./PatientImages";

export default function PatientItem({ patientInfo, type }) {
  const { handoverId } = useHandoverSetStore((state) => state);
  const [handoverPatientId, setHandoverPatientId] = useState();
  const { completedHandover, setCompletedHandover } = usePatientCardStore(
    (state) => state,
  );
  const isCompleted = completedHandover[patientInfo.id];
  console.log("patientitem에서의 인계장 번호 조회", handoverId);

  useEffect(() => {
    if (handoverId) {
      customAxios
        .get("Handover", {
          params: {
            ID: handoverId,
          },
        })
        .then((res) => {
          console.log("인계장 id 환자 id 비교용", res);
          const patientIdFromHandover = res.data.responseData.patientID;
          setHandoverPatientId(patientIdFromHandover);

          if (patientIdFromHandover === patientInfo.id) {
            setCompletedHandover(patientInfo.id, true);
          }
        });
    }
  }, [handoverId, patientInfo.id]);

  return (
    <Box
      type={"white"}
      size={["102px", "140px"]}
      padding={"14px 10px"}
      props={
        isCompleted
          ? "box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px inset, rgba(6, 24, 44, 0.65) 0px 2px 2px -1px inset, rgba(255, 255, 255, 0.08) 0px 2px 2px inset;"
          : ""
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "140px",
        }}
      >
        <p
          style={{
            fontSize: Common.fontSize.fontXXS,
            fontWeight: Common.fontWeight.bold,
            wordSpacing: type === "patient" ? "0px" : "-3px",
            display: "flex",
          }}
        >
          {type === "patient" ? (
            patientInfo.ward
          ) : (
            <>
              <BsCalendarPlus
                style={{
                  marginRight: "5px",
                }}
              />
              {` ${new Date(patientInfo.hospitalization).toLocaleDateString(
                "ko-KR",
                {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                },
              )}`}
            </>
          )}
        </p>

        <PatientImages
          age={patientInfo.age}
          gender={patientInfo.gender}
          imgNum={patientInfo.img}
          style={{ borderRadius: "300px", width: "60px" }}
        />
        <p
          style={{
            fontSize: Common.fontSize.fontS,
            fontWeight: Common.fontWeight.extrabold,
          }}
        >
          {patientInfo.name}
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: Common.fontSize.fontS,
            fontWeight: Common.fontWeight.bold,
          }}
        >
          {patientInfo.gender} {patientInfo.age}세
        </p>
      </div>
    </Box>
  );
}
