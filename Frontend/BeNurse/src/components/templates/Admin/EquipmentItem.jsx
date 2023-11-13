import React from "react";
import { Common } from "../../../utils/global.styles";
import device_as from "@assets/Icons/device_as.png";

export default function EquipmentItem({ item }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding: "10px",
        boxSizing: "border-box",
        transition: "all 0.2s",
        fontSize: "14px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img
        src={item.img}
        width="70px"
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ fontWeight: "bold" }}>{item.name}</div>
        <div style={{ fontSize: "11px" }}>ID: {item.id}</div>
      </div>

      <div
        style={{
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img
          src={device_as}
          width="14px"
        />
        <div>{item.asTel}</div>
      </div>
    </div>
  );
}
