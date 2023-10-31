import React, { useState } from "react";
import Box from "../../atoms/Box/Box";
import { Common } from "../../../utils/global.styles";

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
          width: "100%",
          padding: "10px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              style={{ borderRadius: "50px", width: "50px", height: "50px" }}
              src=""
              alt=""
            />
            <div>
              <p>정은경 간호사</p>
              <p>내과 A병동 2년차</p>
            </div>
          </div>
        </div>
        <p>day</p>
      </div>
    </Box>
  );
}
