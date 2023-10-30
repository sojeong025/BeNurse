import React from "react";
import { Common } from "@utils/global.styles.jsx";
import PatientDetailProfile from "../../components/templates/Patient/PatientDetailProfile";
import PatientDetailHeader from "../../components/templates/Patient/PatientDetailHeader";
import PatientDetailItem from "../../components/templates/Patient/PatientDetailItem";

// Components
import Box from "@components/atoms/Box/Box";

export default function PatientDetailPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "386px",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <PatientDetailHeader type="주요내역" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "412px",
              height: "186px",
              borderTop: "1px solid #D9D9D9",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "380px",
                height: "167px",
                marginTop: "18px",
                borderLeft: "3px solid" + Common.color.purple04,
              }}
            >
              <PatientDetailItem name="주호소" />
              <PatientDetailItem name="진단명" />
              <PatientDetailItem name="수술명" />
            </div>
          </div>
          <PatientDetailHeader type="" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "412px",
              height: "400px",
              borderTop: "1px solid #D9D9D9",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "380px",
                height: "330px",
                marginTop: "18px",
                borderLeft: "3px solid" + Common.color.purple04,
              }}
            >
              <PatientDetailItem name="병증이력" />
              <PatientDetailItem name="투약" />
              <PatientDetailItem name="음주" />
              <PatientDetailItem name="흡연" />
              <PatientDetailItem name="알레르기" />
              <PatientDetailItem name="자가약" />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
