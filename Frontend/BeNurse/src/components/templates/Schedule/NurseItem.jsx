import React, { useState } from "react";
import Box from "../../atoms/Box/Box";
import { Common } from "../../../utils/global.styles";
import nurse from "@assets/Images/patient_temp.png";

export default function NurseItem() {
  return (
    <Box
      type={"white"}
      size={["100%", "90px"]}
      flex={["flex-start", "center"]}
    >
      <div
        style={{
          width: "20px",
          height: "100%",
          backgroundColor: "#FFE15D",
          borderRadius: "16px 0px 0px 16px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          width: "100%",
          padding: "10px 20px",
          color: Common.color.black03,
          fontSize: Common.fontSize.fontS,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img
              style={{
                height: "48px",
                borderRadius: "50px",
                border: "1px solid gray",
              }}
              src={nurse}
              alt=""
            />
            <div>
              <p
                style={{
                  fontWeight: Common.fontWeight.extrabold,
                  marginBottom: "6px",
                }}
              >
                정은경 간호사
              </p>
              <p
                style={{
                  fontWeight: Common.fontWeight.bold,
                  fontSize: Common.fontSize.fontXXS,
                }}
              >
                내과 A병동 2년차
              </p>
            </div>
          </div>
        </div>
        <p
          style={{
            fontSize: Common.fontSize.fontXS,
            fontWeight: Common.fontWeight.extrabold,
            color: Common.color.black01,
          }}
        >
          DAY
        </p>
      </div>
    </Box>
  );
}
