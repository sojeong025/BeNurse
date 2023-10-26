import React from "react";
import Calendar from "react-calendar";
import "./CustomCalendar.css";

export default function SchedulePage() {
  return (
    <div>
      <Calendar
        locale="ko-KR"
        formatDay={(locale, date) => date.getDate()}
      />
    </div>
  );
}
