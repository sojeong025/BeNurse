import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Common } from "../../utils/global.styles";
import { useBottomSheetStore } from "../../store/store";
import { Header } from "@components/templates/Schedule/ScheduleCalendar.styles";

// Components
import PatientJournalItem from "../../components/templates/Patient/PatientJournalItem";
import BottomSelectPanel from "../../components/templates/BottomSelectPanel/BottomSelectPanel";
import CreatePencilButton from "../../components/atoms/Button/CreatePencilButton";

// Icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function PatientJournalPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  );

  const prevDay = () => {
    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));
    setCurrentDate(yesterday);
  };
  const nextDay = () => {
    const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));
    setCurrentDate(tomorrow);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "386px",
        marginTop: "74px",
      }}
    >
      <Header style={{ position: "absolute", zIndex: 2 }}>
        <div style={{ display: "flex" }}>
          <button onClick={prevDay}>
            <MdKeyboardArrowLeft />
          </button>
          <h2 style={{ width: "77px", textAlign: "center" }}>
            {currentDate.getMonth() + 1}월 {currentDate.getDate()}일
          </h2>
          <button onClick={nextDay}>
            <MdKeyboardArrowRight />
          </button>
        </div>
        <div>
          <NavLink to="/off-application">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffffff",
                marginTop: "-8px",
              }}
            >
              <span>김싸피 / 52세 남</span>
            </div>
          </NavLink>
        </div>
      </Header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "85px 0px 0px 0px",
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
          <PatientJournalItem id={1} />
          <PatientJournalItem id={2} />
          <PatientJournalItem id={3} />
          <PatientJournalItem id={4} />
          <PatientJournalItem id={5} />
          <PatientJournalItem id={6} />
          <PatientJournalItem id={7} />
          <PatientJournalItem id={8} />
          <PatientJournalItem id={9} />
          <PatientJournalItem id={10} />
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
