import React, { useState, useEffect } from "react";
import { Common } from "../../../../utils/global.styles";

import Textarea from "@components/atoms/Textarea/Textarea";
import Button from "@components/atoms/Button/Button";
import { customAxios } from "../../../../libs/axios";
import { useHandoverSetStore } from "../../../../store/store";

export default function HandOverDetailCC() {
  const [showWarning, setShowWarning] = useState(false);
  const { handoverEtc, setHandoverEtc, handoverPatientId } =
    useHandoverSetStore((state) => state);
  const [inputEtc, setInputEtc] = useState("");

  const addInput = () => {
    if (inputEtc !== "") {
      const newHandoverCC = [...handoverEtc, inputEtc];
      setHandoverEtc(() => newHandoverCC);
      setInputEtc("");
    } else {
      console.log("내용을 입력해주세요");
    }
  };

  const handleInputChange = (e) => {
    setInputEtc(e.target.value);
    console.log(e.target.value);
    console.log(inputEtc);
  };

  useEffect(() => {
    if (handoverEtc.length === 0) {
      customAxios.get("emr/patient?id=" + handoverPatientId).then((res) => {
        setHandoverEtc(() => res.data.responseData.patient.cc);
      });
    }

    return () => {
      if (inputEtc !== "") {
        const newHandoverCC = [...handoverEtc, inputEtc];
        setHandoverEtc(() => newHandoverCC);
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
        기타 사항(ETC)
      </p>
      <p
        style={{
          lineHeight: "20px",
          fontSize: Common.fontSize.fontXS,
        }}
      >
        인수자에게 추가적으로 담당 환자의 중요 정보와 주의사항이 있다면,
        <br />
        자세하게 기록하여 전달해주세요.
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
        {handoverEtc.map((item, index) => {
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
          value={inputEtc}
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
