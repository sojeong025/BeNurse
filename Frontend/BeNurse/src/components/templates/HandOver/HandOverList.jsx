import React from "react";
import HandOverListItem from "./HandOverListItem";

export default function HandOverList() {
  return (
    <div style={{ height: "600px", overflow: "scroll" }}>
      <div style={{ padding: "0px 20px 20px 20px", boxSizing: "border-box" }}>
        <HandOverListItem />
        <HandOverListItem />
        <HandOverListItem />
      </div>
    </div>
  );
}
