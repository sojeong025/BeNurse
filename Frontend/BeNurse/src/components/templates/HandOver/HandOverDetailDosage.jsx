import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../atoms/Container/Container";
import BottomButton from "@components/atoms/Button/BottomButton";

export default function HandOverDetailDosage() {
  const navigate = useNavigate();
  const nextStep = () => {
    navigate("../CC");
  };
  return (
    <div>
      <BottomButton onNextClick={nextStep}></BottomButton>
    </div>
  );
}
