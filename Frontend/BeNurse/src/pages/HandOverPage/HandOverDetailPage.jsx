import React, { useState, useEffect } from "react";
import { message, Steps } from "antd";
import Container from "@components/atoms/Container/Container";
import BottomButton from "@components/atoms/Button/BottomButton";

import HandOverDetailInfo from "@components/templates/HandOver/HandOverDetailInfo";
import HandOverDetailDosage from "@components/templates/HandOver/HandOverDetailDosage";
import HandOverDetailCC from "@components/templates/HandOver/HandOverSteps/HandOverDetailCC";
import HandOverDetailSign from "@components/templates/HandOver/HandOverSteps/HandOverDetailSign";

import * as S from "./HandOverDetailPage.styles";

export default function HandOverDetailPage() {
  const [bgColor, setBgColor] = useState("white");

  const steps = [
    {
      title: "First",
      content: <HandOverDetailInfo />,
    },
    {
      title: "Second",
      content: <HandOverDetailDosage />,
    },
    {
      title: "Last",
      content: <HandOverDetailCC />,
    },
    {
      title: "Last",
      content: <HandOverDetailSign />,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current === 0 || current === 1) {
      setBgColor("white");
    } else {
      setBgColor("purple");
    }
  }, [current]);

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
              onNextClick={() => message.success("Processing complete!")}
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
