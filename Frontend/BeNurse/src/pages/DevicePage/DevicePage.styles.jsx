import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

//키프레임 먼저 선언
export const cloud1 = keyframes`
0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(30px);
    }
    100% {
      transform: translateY(0);
    }
`;

export const cloud2 = keyframes`
0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-30px);
    }
    100% {
      transform: translateY(0);
    }
`;

export const StyledImg1 = styled.img`
  position: absolute;
  width: 120px;
  top: 160px;
  left: 50px;
  animation: ${cloud1} 3s ease-in-out infinite;
`;

export const StyledImg2 = styled.img`
  position: absolute;
  width: 150px;
  top: 180px;
  right: 30px;
  animation: ${cloud2} 3s ease-in-out infinite;
`;
