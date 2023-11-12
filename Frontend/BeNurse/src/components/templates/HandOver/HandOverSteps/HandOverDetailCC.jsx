import React, { useEffect, useRef, useState } from "react";
import { Common } from "../../../../utils/global.styles";

import Textarea from "@components/atoms/Textarea/Textarea";
import Button from "@components/atoms/Button/Button";

import { useHandoverSetStore } from "../../../../store/store";
import { customAxios } from "../../../../libs/axios";

export default function HandOverDetailCC() {
  const [showWarning, setShowWarning] = useState(false);
  const { handoverCC, setHandoverCC, handoverPatientId } = useHandoverSetStore(
    (state) => state,
  );
  const [inputCC, setInputCC] = useState("");

  const addInput = () => {
    if (inputCC !== "") {
      const newHandoverCC = [...handoverCC, inputCC];
      setHandoverCC(() => newHandoverCC);
      setInputCC("");
    } else {
      console.log("내용을 입력해주세요");
    }
  };

  const handleInputChange = (e) => {
    setInputCC(e.target.value);
    console.log(e.target.value);
    console.log(inputCC);
  };

  useEffect(() => {
    if (handoverCC.length === 0) {
      customAxios.get("emr/patient?id=" + handoverPatientId).then((res) => {
        setHandoverCC(() => res.data.responseData.patient.cc);
      });
    }

    return () => {
      if (inputCC !== "") {
        const newHandoverCC = [...handoverCC, inputCC];
        setHandoverCC(() => newHandoverCC);
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
        주호소(Cheif Complain)
      </p>
      <p
        style={{
          lineHeight: "20px",
          fontSize: Common.fontSize.fontXS,
        }}
      >
        환자의 상태와 통증 정도를 정확하게 이해하고, <br />
        적절한 간호 조치를 취할 수 있도록 주호소를 기록해주세요.
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
        {handoverCC.map((item, index) => {
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
        <Textarea
          value={inputCC}
          onChange={(e) => handleInputChange(e)}
          props={"margin-bottom: 14px;"}
        />
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
