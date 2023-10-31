import React from "react";
import { Common } from "@utils/global.styles.jsx";
import PatientDetailProfile from "../../components/templates/Patient/PatientDetailProfile";
import PatientDetailHeader from "../../components/templates/Patient/PatientDetailHeader";
import PatientDetailItem from "../../components/templates/Patient/PatientDetailItem";

import * as S from "./PatientDetail.styles";

// Components
import Box from "@components/atoms/Box/Box";

export default function PatientDetailPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "calc(100% - 28px)",
        marginTop: "74px",
      }}
    >
      <PatientDetailProfile />
      <Box
        flex={["center", "flex-start"]}
        type={"transparent"}
        margin={"0px 0px 20px 0px"}
        size={["384px", "560px"]}
        font={"16px"}
        overflowX={"hidden"}
        overflowY={"scroll"}
      >
        <S.PatientDetailContainer>
          <PatientDetailHeader type="주요내역" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              borderTop: "1px solid #D9D9D9",
            }}
          >
            <S.PatientDetailItemContainer>
              <PatientDetailItem name="주호소" />
              <PatientDetailItem name="진단명" />
              <PatientDetailItem name="수술명" />
            </S.PatientDetailItemContainer>
          </div>
          <PatientDetailHeader type="" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              borderTop: "1px solid #D9D9D9",
            }}
          >
            <S.PatientDetailItemContainer>
              <PatientDetailItem name="병증이력" />
              <PatientDetailItem name="투약" />
              <PatientDetailItem name="음주" />
              <PatientDetailItem name="흡연" />
              <PatientDetailItem name="알레르기" />
              <PatientDetailItem name="자가약" />
            </S.PatientDetailItemContainer>
          </div>
        </S.PatientDetailContainer>
      </Box>
    </div>
  );
}
