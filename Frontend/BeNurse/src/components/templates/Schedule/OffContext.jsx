import React from "react";

export default function OffContext({ selectDates }) {
  const sortedDates = [...selectDates].sort((a, b) => a - b);
  return (
    <div style={{ height: "350px" }}>
      선택한 날짜:
      {sortedDates &&
        sortedDates.map((date, index) => <div key={index}>{date}</div>)}
    </div>
  );
}
