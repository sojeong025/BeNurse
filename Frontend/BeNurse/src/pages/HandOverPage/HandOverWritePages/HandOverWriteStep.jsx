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

export default function HandOverWriteStep() {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState("white");

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

  const { handoverId } = useHandoverSetStore((state) => state);
  const setCompletedHandover = usePatientCardStore(
    (state) => state.setCompletedHandover,
  );
  const handleCompleteClick = () => {
    setCompletedHandover(handoverId, true);
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
          {current === 0 && <BottomButton onNextClick={() => next()} />}
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
              onNextClick={() => next()}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
