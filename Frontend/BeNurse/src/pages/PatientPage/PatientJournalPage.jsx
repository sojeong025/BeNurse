import React, { useState, useRef, useEffect } from "react";
import moment from "moment";

import { useDateStore } from "../../store/store";

// Components
import Container from "../../components/atoms/Container/Container";
import JournalDatePicker from "../../components/templates/Patient/JournalDatePicker";
import JournalTimeLine from "../../components/templates/Patient/JournalTimeLine";
import CreatePencilButton from "../../components/atoms/Button/CreatePencilButton";
import BottomSelectPanel from "../../components/templates/BottomSelectPanel/BottomSelectPanel";

const PatientJournalPage = () => {
  const { selectedDate, setSelectedDate } = useDateStore((state) => state);

  return (
    <Container>
      <div style={{ width: "100%" }}>
        <JournalDatePicker />
        <JournalTimeLine />
        <div
          style={{
            position: "absolute",
            right: "14px",
            bottom: "80px",
            zIndex: 1,
          }}
        >
          <CreatePencilButton />
        </div>
        <BottomSelectPanel
          modifyLabel={"일지 수정"}
          deleteLabel={"일지 삭제"}
        />
      </div>
    </Container>
  );
};

export default PatientJournalPage;
