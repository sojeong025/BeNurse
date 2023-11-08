import React, { useState } from "react";
import { Common } from "../../../utils/global.styles";

import Input from "@components/atoms/Input/Input";
import Button from "@components/atoms/Button/Button";

export default function HandOverDetailCC() {
  const [inputs, setInputs] = useState([{ name: "주호소 1", value: "" }]);
  const [showWarning, setShowWarning] = useState(false);

  const addInput = () => {
    if (inputs[inputs.length - 1].value) {
      setInputs([
        ...inputs,
        { name: `주호소 ${inputs.length + 1}`, value: "" },
      ]);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newInputs = [...inputs];
    newInputs[index].value = value;
    setInputs(newInputs);
    if (value) setShowWarning(false);
  };

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
        주호소(Cheif Complain)
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "20px",
          marginTop: "10px",
          color: Common.color.black02,
          fontSize: Common.fontSize.fontS,
          fontWeight: Common.fontWeight.bold,
          height: "540px",
          overflowY: "auto",
        }}
      >
        {inputs.map((input, index) => (
          <React.Fragment key={index}>
            <p>{input.name}</p>
            <Input
              variant={"default"}
              value={input.value}
              onChange={(e) => handleInputChange(e, index)}
            />
          </React.Fragment>
        ))}
        <div style={{ height: "50px", width: "100%" }}>
          {showWarning && (
            <p
              style={{
                color: "red",
                fontSize: `${Common.fontSize.fontXXS}`,
                marginBottom: "15px",
                marginTop: "-10px",
              }}
            >
              내용을 입력해주세요.
            </p>
          )}
          <Button
            variant="primary"
            height="50px"
            width="100%"
            onClick={addInput}
          >
            추가
          </Button>
        </div>
      </div>
    </div>
  );
}
