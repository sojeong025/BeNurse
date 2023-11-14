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

import moment from "moment";

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

  const handleDateSelection = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      day + 1,
    );
    const dateString = date.toISOString().slice(0, 10);
    setSelectedDates((prev) => {
      if (prev.includes(dateString)) {
        return prev.filter((d) => d !== dateString);
      } else {
        const updatedDates = [...prev, dateString];
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
            {moment().add(1, "month").format("YYYY년 MM월")}
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
                          checked={selectedDates.includes(
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth() + 1,
                              date.day + 1,
                            )
                              .toISOString()
                              .slice(0, 10),
                          )}
                          id={`checkbox-${i}-${j}`}
                          onChange={() => {
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
