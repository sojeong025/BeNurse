import React from "react";
import { Common } from "../../utils/global.styles";
import { usePatientStore } from "../../store/store";

// Components
import PatientJournalItem from "../../components/templates/Patient/PatientJournalItem";
import BottomSelectPanel from "../../components/templates/BottomSelectPanel/BottomSelectPanel";
import CreatePencilButton from "../../components/atoms/Button/CreatePencilButton";

export default function PatientJournalPage() {
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
          zIndex: "2",
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
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
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
        <CreatePencilButton />
      </div>
      <BottomSelectPanel
        modifyLabel={"일지 수정"}
        deleteLabel={"일지 삭제"}
      />
    </div>
  );
}
