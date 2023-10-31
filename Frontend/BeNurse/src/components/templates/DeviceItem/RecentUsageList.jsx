import React from "react";
import { Common } from "../../../utils/global.styles";
import RecentUsageItem from "./RecentUsageItem";

export default function RecentUsageList() {
  return (
    <div style={{ height: "276px", padding: "20px", overflow: "scroll" }}>
      <p
        style={{
          fontSize: Common.fontSize.fontXS,
          fontWeight: Common.fontWeight.bold,
          color: Common.color.purple04,
        }}
      >
        2023.10.23 (월)
      </p>
      <div
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #D9D9D9",
        }}
      >
        <RecentUsageItem />
        <RecentUsageItem />
        <RecentUsageItem />
        <RecentUsageItem />
      </div>
      <p
        style={{
          fontSize: Common.fontSize.fontXS,
          fontWeight: Common.fontWeight.bold,
          color: Common.color.purple04,
        }}
      >
        2023.10.23 (월)
      </p>
      <div style={{ marginBottom: "20px", borderBottom: "1px solid #D9D9D9" }}>
        <RecentUsageItem />
        <RecentUsageItem />
        <RecentUsageItem />
        <RecentUsageItem />
      </div>
    </div>
  );
}
