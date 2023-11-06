import React, { useEffect, useState } from "react";
import Box from "../../components/atoms/Box/Box";
import { Common } from "../../utils/global.styles";
import calendar from "@assets/Images/calendar.png";
import { bouncingdiv } from "./ScheduleCreateIntro.styles";

export default function ScheduleCreateIntroPage() {
  const [step, setStep] = useState(0);
  return (
    <Box
      type={"white"}
      size={["600px", "500px"]}
      props={"flex-direction: column; font-size: 16px;"}
      flex={["space-around", "center"]}
    >
      <img
        style={{
          marginTop: "30px",
          width: "180px",
          transform: "rotate(8deg)",
        }}
        src={calendar}
        alt=""
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <p style={{ fontSize: Common.fontSize.fontXL }}>
          근무표 만들기를 시작합니다
        </p>
        <p style={{ fontSize: Common.fontSize.fontXL }}>
          단계를 거칠수록 좋은 근무표가 나올거에요.
        </p>
      </div>

      <Box
        type={"purple03"}
        size={["200px", "60px"]}
        props={"cursor: pointer;"}
        onClick={() => {
          setStep((step) => step + 1);
        }}
      >
        {step < 1 ? "시작하기" : "다음"}
      </Box>
    </Box>
  );
}
