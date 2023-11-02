import React from "react";
import { NavLink } from "react-router-dom";

import Input from "@components/atoms/Input/Input";
import PatientItem from "@components/templates/Patient/PatientItem";
import PatientFilterSelect from "@components/templates/Patient/PatientFilterSelect";

import { Common } from "@utils/global.styles.jsx";

export default function PatientListPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "386px",
        marginTop: "84px",
      }}
    >
      <div
        style={{
          background: `${Common.color.purple00}`,
          position: "absolute",
          top: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: `0px 0px 10px 10px ${Common.color.purple00} `,
          zIndex: "1",
        }}
      >
        <Input
          width={"356px"}
          variant={"search"}
          placeholder={"환자 이름으로 검색"}
        />
        <PatientFilterSelect />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingBottom: "50px",
          marginTop: "110px",
          paddingTop: "20px",
          height: "591px",
          overflow: "scroll",
          gap: "15px",
          boxSizing: "border-box",
        }}
      >
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
