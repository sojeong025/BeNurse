import React from "react";
import { Common } from "../../../utils/global.styles";
import RecentUsageItem from "./RecentUsageItem";

export default function RecentUsageList({ usage, historyKeys }) {
  return (
    usage &&
    historyKeys.map((date, index) => {
      return (
        <div
          key={index}
          style={{ height: "276px", padding: "20px", overflow: "scroll" }}
        >
          <p
            style={{
              fontSize: Common.fontSize.fontXS,
              fontWeight: Common.fontWeight.bold,
              color: Common.color.purple04,
            }}
          >
            {date}
          </p>
          <div
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #D9D9D9",
            }}
          >
            {usage[date].map((log, index) => {
              return (
                <RecentUsageItem
                  key={index}
                  log={log}
                />
              );
            })}
          </div>
        </div>
      );
    })
  );
}
