import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { Common } from "../../../utils/global.styles";
import {
  CalendarWrapper,
  Table,
  WeekdayRow,
  Weekday,
  Td,
  CheckBox,
} from "./ScheduleCalendar.styles";
import { useOffDateStore } from "../../../store/store";

export default function ScheduleCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const { selectedDates, setSelectedDates } = useOffDateStore();

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

  const handleDateSelection = (date) => {
    console.log("handleDateSelection called with", date);
    setSelectedDates((prev) => {
      if (prev.includes(date)) {
        return prev.filter((d) => d !== date);
      } else {
        const updatedDates = [...prev, date];
        console.log(updatedDates);
        return updatedDates;
      }
    });
  };

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
          <div
            style={{
              fontSize: Common.fontSize.fontS,
              marginBottom: "5px",
              lineHeight: "24px",
            }}
          >
            원하는 오프 신청일을 클릭해주세요. <br />
            다음 버튼을 눌러 사유를 작성해주세요.
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
        ></div>
      </div>
      <Table>
        <thead>
          <WeekdayRow>
            <Weekday style={{ color: "red" }}>일</Weekday>
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
                  isSunday={j === 0}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {date.day}
                    {date.isCurMonth && (
                      <CheckBox>
                        <input
                          type="checkbox"
                          checked={selectedDates.includes(date.day)}
                          id={`checkbox-${i}-${j}`}
                          onChange={() => {
                            console.log("Checkbox changed for date", date.day);
                            handleDateSelection(date.day);
                          }}
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
    </CalendarWrapper>
  );
}
