import React from "react";
import HandOverListItem from "./HandOverListItem";
import { NavLink } from "react-router-dom";

export default function HandOverList({ linkto }) {
  if (linkto === "write") {
    return (
      <div
        style={{
          height: "600px",
          overflow: "scroll",
          width: "calc(100% - 28px)",
          margin: "0 auto",
        }}
      >
        <div style={{ padding: "0px 0 20px 0", boxSizing: "border-box" }}>
          <NavLink
            to="/handover-write"
            onClick={() => {
              localStorage.setItem("isTemporary", "temp");
            }}
          >
            <HandOverListItem />
          </NavLink>
          <NavLink
            to="/handover-write"
            onClick={() => {
              localStorage.setItem("isTemporary", "temp");
            }}
          >
            <HandOverListItem />
          </NavLink>
          <NavLink
            to="/handover-write"
            onClick={() => {
              localStorage.setItem("isTemporary", "temp");
            }}
          >
            <HandOverListItem />
          </NavLink>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "600px",
          overflow: "scroll",
          width: "calc(100% - 28px)",
          margin: "0 auto",
        }}
      >
        <NavLink to="../handover-list/patients">
          <HandOverListItem />
        </NavLink>
        <NavLink to="../handover-list/patients">
          <HandOverListItem />
        </NavLink>
        <NavLink to="../handover-list/patients">
          <HandOverListItem />
        </NavLink>
      </div>
    );
  }
}
