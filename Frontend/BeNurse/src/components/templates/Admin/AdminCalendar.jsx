import React, { useEffect, useState } from "react";
import { Common } from "../../../utils/global.styles";
import { customAxios } from "../../../libs/axios";
import "react-spring-bottom-sheet/dist/style.css";
import {
  CalendarWrapper,
  Table,
  WeekdayRow,
  Weekday,
  Td,
  SelectCircle,
} from "./AdminCalendar.styles";
import { useAdminStore } from "../../../store/store";

export default function AdminCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const { schedule, setSchedule, selectedDate, setSelectedDate } =
    useAdminStore((state) => state);

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
      dates.push({ day: i, isCurMonth: true, type: getRandomType() });
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

  const getRandomType = () => {
    const types = ["day", "evening", "night", "off"];
    return types[Math.floor(Math.random() * types.length)];
  };

  const weeks = createCalendar(currentDate);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();

    const startDate = `${year}-${month
      .toString()
      .padStart(2, "0")}-${selectedDate?.toString().padStart(2, "0")}`;
    const endDate = `${year}-${month.toString().padStart(2, "0")}-${selectedDate
      ?.toString()
      .padStart(2, "0")}`;

    customAxios
      .get("Schedule/all", {
        params: {
          endDate: endDate,
          startDate: startDate,
        },
      })
      .then((res) => {
        setSchedule(res.data.responseData);
      })
      .catch((err) => console.log(err));
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(today.getDate());
  }, []);

  return (
    <CalendarWrapper>
      <div style={{ display: "flex", marginLeft: "18px" }}>
        <h2>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
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
                  id={j}
                  lastRow={i === weeks.length - 1}
                  key={j}
                  isCurMonth={date.isCurMonth}
                  isSunday={j === 0}
                  onClick={() => {
                    setSelectedDate(date.day);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {date.day}
                    {date.isCurMonth && selectedDate === date.day && (
                      <SelectCircle />
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
