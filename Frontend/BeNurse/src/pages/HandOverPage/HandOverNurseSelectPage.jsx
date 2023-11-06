import React from "react";

import { useNavigate } from "react-router-dom";

import Container from "@components/atoms/Container/Container";
import BottomButton from "@components/atoms/Button/BottomButton";
import Input from "@components/atoms/Input/Input";

import HandOverNurseSelectItem from "@components/templates/HandOver/HandOverNurseSelectItem";

import { Common } from "../../utils/global.styles";

export default function HandOverNurseSelectPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <div
        style={{
          position: "relative",
          marginTop: "100px",
          width: "calc(100% - 28px)",
          margin: "100px auto 0 auto",
        }}
      >
        <div
          style={{
            color: Common.color.black02,
            fontSize: Common.fontSize.fontM,
            fontWeight: Common.fontWeight.extrabold,
            margin: "15px 0",
          }}
        >
          인수자 선택
        </div>
        <Input
          variant="search"
          placeholder="병동 또는 이름으로 검색 해보세요."
          width="calc(100% - 28px)"
          type="text"
        />
        <div
          style={{
            height: "600px",
            overflowY: "auto",
            paddingBottom: "60px",
            boxSizing: "border-box",
          }}
        >
          <HandOverNurseSelectItem />
        </div>

        <div style={{ marginLeft: "-14px" }}>
          <BottomButton
            onPrevClick={() => navigate(-1)}
            onNextClick={() => next()}
            nextText="완료"
          />
        </div>
      </div>
    </Container>
  );
}
