import React from "react";
import { Common } from "../../../utils/global.styles";

import Container from "@components/atoms/Container/Container";
import Input from "@components/atoms/Input/Input";

export default function HandOverDetailCC() {
  return (
    <Container>
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
          주호소(Cheif Complain)
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
          <p>주호소 1</p>
          <Input variant={"default"} />
          <p>주호소 2</p>
          <Input variant={"default"} />
          <p>주호소 3</p>
          <Input variant={"default"} />
        </div>
      </div>
    </Container>
  );
}
