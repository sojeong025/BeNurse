import React, { useState, useEffect } from "react";
import { Button, message, Steps, theme } from "antd";
import Container from "@components/atoms/Container/Container";
import BottomButton from "@components/atoms/Button/BottomButton";

import HandOverDetailInfo from "@components/templates/HandOver/HandOverDetailInfo";
import HandOverDetailCC from "@components/templates/HandOver/HandOverDetailCC";

import * as S from "./HandOverWriteStep.styles";

export default function HandOverWriteStep() {
  const steps = [
    {
      title: "First",
      content: <HandOverDetailInfo />,
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: <HandOverDetailCC />,
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
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
    <Container>
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
              onNextClick={() => next()}
            />
          )}
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
