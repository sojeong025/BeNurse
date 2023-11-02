import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Common } from "../../utils/global.styles";
import HandOverDetailInfo from "../../components/templates/HandOver/HandOverDetailInfo";

import BottomButton from "@components/atoms/Button/BottomButton";

import Container from "../../components/atoms/Container/Container";

import * as S from "./HandOverListPage.styles";

export default function HandOverDetailPage() {
  const path = useLocation().pathname;

  return (
    <Container>
      <S.StyledDiv>
        <div
          style={{
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                backgroundColor: Common.color.purple03,
                color: "white",
              }}
            >
              1
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                backgroundColor: Common.color.purple02,
                color: "white",
              }}
            >
              2
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                backgroundColor: Common.color.purple02,
                color: "white",
              }}
            >
              3
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                backgroundColor: Common.color.purple02,
                color: "white",
              }}
            >
              4
            </div>
          </div>
          <Outlet />
        </div>
      </S.StyledDiv>
    </Container>
  );
}
