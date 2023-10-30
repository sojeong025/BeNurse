import React, { useState, useRef } from "react";
import { Common } from "../../utils/global.styles";
import { usePatientStore } from "../../store/store";
import PatientJournalItem from "../../components/templates/Patient/PatientJournalItem";

// Components
import Drawer from "../../components/atoms/Drawer/Drawer";

// Icons
import createpencil from "@assets/Icons/createpencil.svg";

export default function PatientJournalPage() {
  const { isEditActivated } = usePatientStore((state) => state);
  return (
    <div
      style={{
        position: "relative",
        width: "386px",
        marginTop: "74px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "-13px",
          width: "412px",
          height: "70px",
          backgroundColor: Common.color.purple03,
          zIndex: "100",
          borderRadius: "0px 0px 16px 16px",
        }}
      >
        HEADER
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "84px 0px 0px 0px",
          marginBottom: "34px",
          height: "590px",
          overflow: "scroll",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "366px",
          }}
        >
          <PatientJournalItem />
          <div
            style={{
              position: "absolute",
              width: "322px",
              height: "101%",
              borderLeft: "3px solid" + Common.color.purple02,
              marginTop: "-14px",
            }}
          ></div>
        </div>
        <div
          style={{
            position: "absolute",
            right: "14px",
            bottom: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "57px",
            height: "57px",
            borderRadius: "30px",
            backgroundColor: Common.color.purple03,
            zIndex: 100,
          }}
        >
          <img
            src={createpencil}
            alt=""
          />
        </div>
      </div>
      {isEditActivated ? <Drawer /> : null}
    </div>
  );
}
