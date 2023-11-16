import React from "react";
import { Common } from "../../utils/global.styles";
import { Outlet } from "react-router-dom";

export default function ScheduleCreatePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
        backgroundColor: Common.color.purple00,
        gap: "40px",
      }}
    >
      <Outlet />
    </div>
  );
}
