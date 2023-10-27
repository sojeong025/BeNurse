import React from "react";
import Box from "../../atoms/Box/Box";
import Input from "../../atoms/Input/Input";
import { Common } from "../../../utils/global.styles";

import PatientItem from "./PatientItem";

export default function Patient() {
  return (
    <div
      style={{
        position: "relative",
        width: "386px",
        marginTop: "74px",
      }}
    >
      <div style={{ position: "absolute", top: "14px" }}>
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{
              color: Common.color.black02,
              fontSize: Common.fontSize.fontXL,
              fontWeight: Common.fontWeight.extrabold,
            }}
          >
            내과 3동 B302
          </span>
        </div>
        <Input
          width={"356px"}
          variant={"search"}
          placeholder={"병실/환자 이름으로 검색"}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "119px 0px 0px 0px",
          marginBottom: "34px",
          height: "576px",
          overflow: "scroll",
        }}
      >
        <div style={{ display: "flex", width: "364px" }}>
          <span
            style={{
              color: Common.color.black02,
              fontSize: Common.fontSize.fontXL,
              fontWeight: Common.fontWeight.bold,
            }}
          >
            환자 목록
          </span>
        </div>
        <div
          style={{
            width: "384px",
            minHeight: "460px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: "10px",
          }}
        >
          <PatientItem type={"patient"} />
          <PatientItem type={"patient"} />
          <PatientItem type={"patient"} />
          <PatientItem type={"patient"} />
          <PatientItem type={"patient"} />
          <PatientItem type={"patient"} />
          <PatientItem type={"patient"} />
          <PatientItem type={"patient"} />
          <PatientItem type={"patient"} />
          <PatientItem type={"patient"} />
        </div>
      </div>
    </div>
  );
}
