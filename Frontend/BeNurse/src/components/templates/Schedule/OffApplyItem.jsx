import React, { useState } from "react";

export default function OffApplyItem({ nurseName, offApply, offkey }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "270px",
        gap: "10px",
        fontSize: "14px",
        marginBottom: "10px",
      }}
      onClick={(e) => {
        setExpanded(!expanded);
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "40px",
          border: "1px solid blue",
        }}
      >
        <p>{nurseName[0].name} 간호사</p>
      </div>
      {expanded ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <p>신청 날짜</p>
            {offApply[offkey].map((apply, index) => (
              <p key={index}>{apply.offdate}</p>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <p>사유</p>
            <p>{offkey}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
