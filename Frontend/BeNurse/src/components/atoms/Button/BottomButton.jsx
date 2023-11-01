import React from "react";
import Box from "../Box/Box";
import { useNavigate } from "react-router-dom";

export default function BottomButton({ onNextClick, nextText = "다음" }) {
  const navigate = useNavigate();

  const onPrevClick = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        bottom: "14px",
        width: "384px",
      }}
    >
      <Box
        type="white"
        size={["180px", "50px"]}
        onClick={onPrevClick}
      >
        이전
      </Box>

      <Box
        type="purple03"
        size={["180px", "50px"]}
        onClick={onNextClick}
      >
        {nextText}
      </Box>
    </div>
  );
}
