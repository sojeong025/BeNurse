import React from "react";
import { Common } from "../../../utils/global.styles";
import { NavLink } from "react-router-dom";

import Box from "../../atoms/Box/Box";

import HandOverItem from "@assets/Icons/handoveritem.svg";

import nurse from "@assets/Images/patient_temp.png";

export default function HandOverListItem() {
  return (
    <NavLink to="patients">
      <Box
        type={"transparent"}
        size={["100%", "62px"]}
        flex={["space-between", "center"]}
        border={true}
      >
        <img
          src={HandOverItem}
          alt=""
        />
        <div style={{ width: "200px" }}>
          <p
            style={{
              fontSize: Common.fontSize.fontS,
              fontWeight: Common.fontWeight.bold,
            }}
          >
            데이 타임 인계장
          </p>
          <p style={{ fontSize: Common.fontSize.fontXS }}>2023.10.19 (목)</p>
        </div>
        <div>
          <img
            style={{
              height: "50px",
              borderRadius: "50px",
              border: "1px solid gray",
              marginRight: "-25px",
            }}
            src={nurse}
            alt=""
          />
          <img
            style={{
              height: "50px",
              borderRadius: "50px",
              border: "1px solid gray",
              marginRight: "-25px",
            }}
            src={nurse}
            alt=""
          />
          <img
            style={{
              height: "50px",
              borderRadius: "50px",
              border: "1px solid gray",
            }}
            src={nurse}
            alt=""
          />
        </div>
      </Box>
    </NavLink>
  );
}
