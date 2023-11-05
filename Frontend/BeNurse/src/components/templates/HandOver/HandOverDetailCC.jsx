import React from "react";
import { useNavigate } from "react-router-dom";
import { Common } from "../../../utils/global.styles";

import Input from "@components/atoms/Input/Input";
import BottomButton from "@components/atoms/Button/BottomButton";

export default function HandOverDetailCC() {
  const navigate = useNavigate();
  const nextStep = () => {
    navigate("../sign");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        gap: "20px",
      }}
    >
      <p
        style={{
          fontSize: Common.fontSize.fontL,
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
        }}
      >
        <p>주호소 1</p>
        <Input variant={"default"} />
        <p>주호소 2</p>
        <Input variant={"default"} />
        <p>주호소 3</p>
        <Input variant={"default"} />
      </div>
      <div>
        <BottomButton onNextClick={nextStep} />
      </div>
    </div>
  );
}
