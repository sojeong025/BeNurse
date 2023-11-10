import React, { useState } from "react";
import { Common } from "../../../../utils/global.styles";

import Textarea from "@components/atoms/Textarea/Textarea";
import Button from "@components/atoms/Button/Button";

export default function HandOverDetailSign() {
  const [inputs, setInputs] = useState([{ name: "특이사항 1", value: "" }]);
  const [showWarning, setShowWarning] = useState(false);

  const addInput = () => {
    if (inputs[inputs.length - 1].value) {
      setInputs([
        ...inputs,
        { name: `특이사항 ${inputs.length + 1}`, value: "" },
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
        gap: "10px",
        width: "calc(100% - 28px)",
      }}
    >
      <p
        style={{
          color: Common.color.black02,
          fontSize: Common.fontSize.fontM,
          fontWeight: Common.fontWeight.extrabold,
          marginTop: "10px",
        }}
      >
        특이 사항(Significant)
      </p>
      <p
        style={{
          lineHeight: "20px",
          fontSize: Common.fontSize.fontXS,
        }}
      >
        환자의 특이사항은 정확한 진단과 효과적인 간호를 위해 중요합니다. <br />
        가능한 모든 세부 사항을 꼼꼼하게 기록해주세요.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "10px",
          marginTop: "20px",
          color: Common.color.black02,
          fontSize: Common.fontSize.fontS,
          fontWeight: Common.fontWeight.bold,
          height: "490px",
          paddingBottom: "70px",
          overflowY: "auto",
        }}
      >
        {inputs.map((input, index) => (
          <React.Fragment key={index}>
            <p>▎{input.name}</p>
            <Textarea
              value={input.value}
              onChange={(e) => handleInputChange(e, index)}
              props={"margin-bottom: 14px;"}
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
                marginTop: "-16px",
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
