import React from "react";
import Box from "../../components/atoms/Box/Box";
import { Common } from "../../utils/global.styles";

export default function ScheduleCreateIntroPage() {
  return (
    <Box
      type={"white"}
      size={["600px", "500px"]}
      props={"flex-direction: column; font-size: 20px;"}
      flex={["space-around", "center"]}
    >
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
