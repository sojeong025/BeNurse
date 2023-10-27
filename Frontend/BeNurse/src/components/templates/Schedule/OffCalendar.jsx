import React, { useState } from "react";
import { Common } from "../../../utils/global.styles";
import offpencil from "@assets/Icons/offpencil.svg";
import {
  CalendarWrapper,
  Table,
  WeekdayRow,
  Weekday,
  Td,
} from "./ScheduleCalendar.styles";

export default function ScheduleCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

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
              fontSize: Common.fontSize.fontXL,
              fontWeight: Common.fontWeight.extrabold,
              marginBottom: "15px",
            }}
          >
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 2}월
          </div>
          <div style={{ fontSize: Common.fontSize.fontM }}>
            원하는 오프 신청일을 설정해주세요.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={offpencil}
            alt=""
            style={{ width: "24px", marginBottom: "5px" }}
          />
          <button
            style={{
              fontSize: Common.fontSize.fontXS,
              fontWeight: Common.fontWeight.extrabold,
              color: Common.color.purple03,
              background: "none",
              border: "none",
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
                  {date.day}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </CalendarWrapper>
  );
}
