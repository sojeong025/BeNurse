import React, { useState, useEffect } from "react";
import { message, Steps } from "antd";
import Container from "@components/atoms/Container/Container";
import BottomButton from "@components/atoms/Button/BottomButton";

import HandOverDetailNurse from "@components/templates/HandOver/HandOverSteps/HandOverDetailNurse";
import HandOverDetailCC from "@components/templates/HandOver/HandOverSteps/HandOverDetailCC";
import HandOverDetailSign from "@components/templates/HandOver/HandOverSteps/HandOverDetailSign";
import HandOverDetailEtc from "@components/templates/HandOver/HandOverSteps/HandOverDetailEtc";

import { useHandoverSetStore } from "../../../store/store";
import { usePatientCardStore } from "../../../store/store";

import * as S from "./HandOverWriteStep.styles";
import { useNavigate } from "react-router-dom";

import { customAxios } from "../../../libs/axios";

export default function HandOverWriteStep() {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState("white");
  const {
    handoverCC,
    handoverEtc,
    handoverId,
    handoverJournals,
    handoverPatientId,
    handoverSpecial,
    handoverSetId,
  } = useHandoverSetStore((state) => state);

  const onTempSave = () => {
    console.log(handoverId);
    const data = {
      handover: {
        cc: handoverCC,
        etc: handoverEtc,
        id: handoverId,
        journals: handoverJournals,
        patientID: handoverPatientId,
        special: handoverSpecial,
      },
      setID: handoverSetId,
    };
    customAxios.put("Handover", data).then((res) => {
      console.log(res);
    });
  };

  const steps = [
    {
      title: "First",
      content: <HandOverDetailNurse />,
    },
    {
      title: "Second",
      content: <HandOverDetailCC />,
    },
    {
      title: "Last",
      content: <HandOverDetailSign />,
    },
    {
      title: "Last",
      content: <HandOverDetailEtc />,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current === 0 || current === 1) {
      setBgColor("purple");
    } else {
      setBgColor("purple");
    }
  }, [current]);

  const handleCompleteClick = () => {
    onTempSave();
    navigate("/handover-write");
  };

  const onChange = (value) => {
    setCurrent(value);
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: "",
  }));

  return (
    <Container backgroundColor={bgColor}>
      <div style={{ width: "100%", marginTop: "100px" }}>
        <S.StepBox>
          <Steps
            onChange={onChange}
            responsive={false}
            current={current}
            items={items}
          />
        </S.StepBox>

        <div>{steps[current].content}</div>
        <div>
          {current === 0 && (
            <BottomButton
              onNextClick={() => {
                next();
                onTempSave();
              }}
            />
          )}
          {current === steps.length - 1 && (
            <BottomButton
              onPrevClick={() => prev()}
              onNextClick={handleCompleteClick}
              nextText="완료"
            />
          )}
          {current > 0 && current < steps.length - 1 && (
            <BottomButton
              onPrevClick={() => prev()}
              onNextClick={() => {
                next();
                onTempSave();
              }}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
