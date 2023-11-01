import React from "react";
import { NavLink } from "react-router-dom";
import { Common } from "@utils/global.styles.jsx";

import Input from "@components/atoms/Input/Input";
import PatientItem from "@components/templates/Patient/PatientItem";

export default function PatientListPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "386px",
        marginTop: "84px",
      }}
    >
      <div style={{ position: "absolute", top: "14px" }}>
        <Input
          width={"356px"}
          variant={"search"}
          placeholder={"환자 이름으로 검색"}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "80px 0px 10px 0px",

          height: "586px",
          overflow: "scroll",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "6px 8px",
              borderRadius: "10px",
              backgroundColor: Common.color.purple03,
              color: Common.color.white01,
            }}
          >
            내과 ▾
          </div>
          <div
            style={{
              display: "flex",
              padding: "6px 8px",
              borderRadius: "10px",
              backgroundColor: Common.color.purple03,
              color: Common.color.white01,
            }}
          >
            3동 ▾
          </div>
          <div
            style={{
              display: "flex",
              padding: "6px 8px",
              borderRadius: "10px",
              backgroundColor: Common.color.purple03,
              color: Common.color.white01,
            }}
          >
            B302 ▾
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "flex-start",

            gap: "10px",
          }}
        >
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
          <NavLink to="detail">
            <PatientItem type={"patient"} />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
