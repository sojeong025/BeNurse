import React from "react";
import { Common } from "../../../utils/global.styles";

import Input from "@components/atoms/Input/Input";

export default function HandOverDetailSign() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        marginTop: "20px",
        gap: "20px",
        width: "calc(100% - 28px)",
      }}
    >
      <p
        style={{
          color: Common.color.black02,
          fontSize: Common.fontSize.fontM,
          fontWeight: Common.fontWeight.extrabold,
        }}
      >
        특이 사항(Significant)
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "20px",
          marginTop: "20px",
          color: Common.color.black02,
          fontSize: Common.fontSize.fontS,
          fontWeight: Common.fontWeight.bold,
        }}
      >
        <p>특이 사항 1</p>
        <Input variant={"default"} />
        <p>특이 사항 2</p>
        <Input variant={"default"} />
        <p>특이 사항 3</p>
        <Input variant={"default"} />
      </div>
    </div>
  );
}
