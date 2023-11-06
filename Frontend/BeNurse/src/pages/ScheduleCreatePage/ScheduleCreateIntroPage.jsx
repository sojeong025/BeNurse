import React, { useEffect, useState } from "react";
import Box from "../../components/atoms/Box/Box";
import { Common } from "../../utils/global.styles";
import calendar from "@assets/Images/calendar.png";

export default function ScheduleCreateIntroPage() {
  const [bool, setBool] = useState(false);

  setInterval(() => {
    setBool(!bool);
  }, 500);

  return (
    <Box
      type={"white"}
      size={["600px", "500px"]}
      props={"flex-direction: column; font-size: 20px;"}
      flex={["space-around", "center"]}
    >
      <img
        style={{
          marginTop: "30px",
          width: "160px",
          translate: bool ? "0px -6px" : "0px 6px",
          transition: "translate 0.5s ease-in-out",
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
        <p style={{ fontSize: Common.fontSize.fontXXL }}>
          근무표 만들기를 시작합니다
        </p>
        <p style={{ fontSize: Common.fontSize.fontXXL }}>
          단계를 거칠수록 좋은 근무표가 나올거에요.
        </p>
      </div>

      <Box
        type={"purple03"}
        size={["260px", "60px"]}
      >
        시작하기
      </Box>
    </Box>
  );
}
