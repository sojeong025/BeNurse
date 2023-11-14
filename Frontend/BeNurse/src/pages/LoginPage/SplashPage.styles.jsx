import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

//키프레임 먼저 선언
export const star = keyframes`
0% {
  transform: translateY(40px);
      opacity: 0;
    }
    40% {
      transform: translateY(0);
      opacity: 1;
    }
    90% {
      transform: rotate(180deg);
      scale: 1.6;
    }
    100% {
      transform: rotate(180deg);
      scale: 1;
    }
`;

export const logo = keyframes`
0% {
      transform: translateY(40px);
      opacity: 0;
    }
    40% {
      transform: translateY(0);
      opacity: 1;
    }
`;

export const StyledStar = styled.img`
  position: absolute;
  left: calc(50% - 98px);
  top: calc(50% + 4px);
  animation: ${star} 2.4s ease-in-out;
`;

export const StyledLogo = styled.img`
  animation: ${logo} 2.4s ease-in-out;
`;
