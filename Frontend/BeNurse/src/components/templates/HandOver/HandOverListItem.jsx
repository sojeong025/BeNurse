import React from "react";
import { Common } from "../../../utils/global.styles";

import Box from "../../atoms/Box/Box";

import HandOverItem from "@assets/Icons/handoveritem.svg";

import nurse from "@assets/Images/patient_temp.png";

export default function HandOverListItem() {
  return (
    <Box
      type={"transparent"}
      size={["100%", "62px"]}
      flex={["space-between", "center"]}
      border={true}
    >
      <div style={{ display: "flex" }}>
        <img
          src={HandOverItem}
          style={{ width: "28px" }}
          alt=""
        />
        <div
          style={{
            marginLeft: "16px",
            height: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: "4px",
          }}
        >
          <p
            style={{
              fontSize: Common.fontSize.fontS,
              fontWeight: Common.fontWeight.bold,
            }}
          >
            데이 타임 인계장
          </p>
          <p style={{ fontSize: Common.fontSize.fontXXS }}>2023.10.19 (목)</p>
        </div>
      </div>
      <div>
        <img
          style={{
            height: "40px",
            borderRadius: "50px",
            border: "1px solid gray",
            marginRight: "-15px",
          }}
          src={nurse}
          alt=""
        />
        <img
          style={{
            height: "40px",
            borderRadius: "50px",
            border: "1px solid gray",
            marginRight: "-15px",
          }}
          src={nurse}
          alt=""
        />
        <img
          style={{
            height: "40px",
            borderRadius: "50px",
            border: "1px solid gray",
          }}
          src={nurse}
          alt=""
        />
      </div>
    </Box>
  );
}
