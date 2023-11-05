import React from "react";
import { useNavigate } from "react-router-dom";
import { Common } from "../../../utils/global.styles";

import Input from "@components/atoms/Input/Input";
import BottomButton from "@components/atoms/Button/BottomButton";

export default function HandOverDetailSign() {
  const navigate = useNavigate();
  const complete = () => {
    navigate("/handover-list/patients");
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
        특이 사항(Significant)
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
        <p>특이 사항 1</p>
        <Input variant={"default"} />
        <p>특이 사항 2</p>
        <Input variant={"default"} />
        <p>특이 사항 3</p>
        <Input variant={"default"} />
      </div>
      <div>
        <BottomButton
          nextText={"완료"}
          onNextClick={complete}
        />
      </div>
    </div>
  );
}
