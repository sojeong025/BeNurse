import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import JournalDatePicker from "../../components/templates/Patient/JournalDatePicker";
import JournalTimeLine from "../../components/templates/Patient/JournalTimeLine";
import CreatePencilButton from "../../components/atoms/Button/CreatePencilButton";
import BottomSelectPanel from "../../components/templates/BottomSelectPanel/BottomSelectPanel";

export default function PatientJournalMain() {
  return (
    <div style={{ width: "100%" }}>
      <JournalDatePicker />
      <JournalTimeLine />
      <Link
        to="write"
        style={{
          position: "absolute",
          right: "14px",
          bottom: "80px",
          zIndex: 1,
        }}
      >
        <CreatePencilButton />
      </Link>
      <BottomSelectPanel
        modifyLabel={"일지 수정"}
        deleteLabel={"일지 삭제"}
      />
    </div>
  );
}
