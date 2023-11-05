import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import { Common } from "@utils/global.styles.jsx";
import Container from "@components/atoms/Container/Container";
import BottomButton from "@components/atoms/Button/BottomButton";

import * as S from "./HandOverWriteStep.styles";

export default function HandOverWriteStep() {
  const steps = [
    {
      title: "First",
      content: "First-content",
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
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
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: `${Common.color.purple00}`,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <Container>
      <div style={{ width: "100%", marginTop: "100px" }}>
        <S.StepBox>
          <Steps
            responsive={false}
            current={current}
            items={items}
          />
        </S.StepBox>

        <div style={contentStyle}>{steps[current].content}</div>
        <div>
          {current === 0 && (
            <BottomButton
              isFirstStep={true}
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
