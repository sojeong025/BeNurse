import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { Common } from "../../../utils/global.styles";
import offpencil from "@assets/Icons/offpencil.svg";
import {
  CalendarWrapper,
  Table,
  WeekdayRow,
  Weekday,
  Td,
  CheckBox,
} from "./ScheduleCalendar.styles";
import Modal from "../../atoms/Modal/Modal";
import OffContext from "./OffContext";

export default function ScheduleCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createCalendar = (date) => {
    const startDay = date.getDay();
    const totalDays = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    const prevMonthTotalDays = new Date(
      date.getFullYear(),
      date.getMonth(),
      0,
    ).getDate();

    let dates = [];
    for (let i = 1; i <= totalDays; i++) {
      dates.push({ day: i, isCurMonth: true });
    }

    for (let i = 0; i < startDay; i++) {
      dates.unshift({ day: prevMonthTotalDays - i, isCurMonth: false });
    }

    let nextMonthDay = 1;
    while (dates.length < 42) {
      dates.push({ day: nextMonthDay++, isCurMonth: false });
    }

    let weeks = [];
    while (dates.length) {
      weeks.push(dates.splice(0, 7));
    }

    return weeks;
  };

  const weeks = createCalendar(currentDate);

  return (
    <CalendarWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0px 14px 10px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: Common.fontSize.fontL,
              fontWeight: Common.fontWeight.bold,
              marginBottom: "15px",
              marginTop: "30px",
            }}
          >
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 2}월
          </div>
          <div style={{ fontSize: Common.fontSize.fontS, marginBottom: "5px" }}>
            원하는 오프 신청일을 설정해주세요.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            cursor: "pointer",
          }}
        >
          <img
            src={offpencil}
            alt=""
            style={{ width: "18px", marginBottom: "5px" }}
          />
          <button
            onClick={openModal}
            style={{
              fontSize: Common.fontSize.fontXS,
              fontWeight: Common.fontWeight.bold,
              color: Common.color.purple03,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            사유등록
          </button>
        </div>
      </div>
      <Table>
        <thead>
          <WeekdayRow>
            <Weekday>일</Weekday>
            <Weekday>월</Weekday>
            <Weekday>화</Weekday>
            <Weekday>수</Weekday>
            <Weekday>목</Weekday>
            <Weekday>금</Weekday>
            <Weekday>토</Weekday>
          </WeekdayRow>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((date, j) => (
                <Td
                  lastRow={i === weeks.length - 1}
                  key={j}
                  isCurMonth={date.isCurMonth}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {date.day}
                    {date.isCurMonth && (
                      <CheckBox>
                        <input
                          type="checkbox"
                          id={`checkbox-${i}-${j}`}
                        />
                        <span>
                          <BsCheck size={24} />
                        </span>
                      </CheckBox>
                    )}
                  </div>
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        visible={isModalOpen}
        onClose={closeModal}
      >
        <OffContext />
      </Modal>
    </CalendarWrapper>
  );
}
