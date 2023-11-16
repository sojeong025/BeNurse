import React from "react";
import { Common } from "../../../utils/global.styles";
import createpencil from "@assets/Icons/createpencil.svg";

export default function CreatePencilButton() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "57px",
        height: "57px",
        borderRadius: "30px",
        backgroundColor: Common.color.purple03,
      }}
    >
      <img
        src={createpencil}
        alt=""
      />
    </div>
  );
}
