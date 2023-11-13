import React, { useState, useEffect } from "react";
import { Common } from "../../../../utils/global.styles";

import Textarea from "@components/atoms/Textarea/Textarea";
import Button from "@components/atoms/Button/Button";
import { customAxios } from "../../../../libs/axios";
import { useHandoverSetStore } from "../../../../store/store";

export default function HandOverDetailSign() {
  const [inputSign, setInputSign] = useState("");
  const { handoverSpecial, setHandoverSpecial, handoverPatientId } =
    useHandoverSetStore((state) => state);
  const [inputs, setInputs] = useState([{ name: "특이사항 1", value: "" }]);
  const [showWarning, setShowWarning] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const addInput = () => {
    if (inputSign !== "") {
      const newHandoverSpecial = [...handoverSpecial, inputSign];
      setHandoverSpecial(() => newHandoverSpecial);
      setInputSign("");
    } else {
      console.log("내용을 입력해주세요");
    }
  };

  const handleInputChange = (e) => {
    setInputSign(e.target.value);
    console.log(e.target.value);
    console.log(inputSign);
  };

  useEffect(() => {
    if (handoverSpecial.length === 0) {
      customAxios.get("emr/patient?id=" + handoverPatientId).then((res) => {
        console.log(res.data.responseData.patient);
      });
    }

    return () => {
      if (inputSign !== "") {
        const newHandoverSpecial = [...handoverSpecial, inputSign];
        setHandoverSpecial(() => newHandoverSpecial);
      }
    };
  }, []);

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
        {handoverSpecial.map((item, index) => {
          console.log(item);
          return (
            <React.Fragment key={index}>
              <Textarea
                defaultValue={item}
                props={"margin-bottom: 14px;"}
              />
            </React.Fragment>
          );
        })}
        {showInput && (
          <Textarea
            value={inputSign}
            onChange={(e) => handleInputChange(e)}
            props={"margin-bottom: 14px;"}
          />
        )}
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
          {inputSign === "" ? (
            <Button
              variant="primary"
              height="50px"
              width="100%"
              onClick={() => {
                setShowInput(true);
              }}
            >
              추가
            </Button>
          ) : (
            <Button
              variant="primary"
              height="50px"
              width="100%"
              onClick={() => {
                addInput();
                setShowInput(false);
              }}
            >
              저장
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
