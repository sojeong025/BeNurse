import React from "react";

import { Common } from "../../../utils/global.styles";

import { MdHistory } from "react-icons/md";

export default function RecentUsageHeader() {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: Common.color.black03,
        }}
      >
        <MdHistory size={18} />
        <p
          style={{
            fontSize: Common.fontSize.fontS,
            fontWeight: Common.fontWeight.bold,
            marginLeft: "4px",
          }}
        >
          장비 사용 이력{" "}
          <span style={{ fontSize: Common.fontSize.fontXXS }}>
            (최근 3일 이내)
          </span>
        </p>
      </div>
    </div>
  );
}
