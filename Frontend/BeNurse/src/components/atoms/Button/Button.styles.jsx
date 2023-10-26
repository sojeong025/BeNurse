import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

const variants = {
  default: {
    background: `${Common.color.white01}`,
    backgroundHover: `${Common.color.white02}`,
    color: `${Common.color.purple04}`,
    boxShadow: "3px 3px 6px 4px rgba(187, 187, 187, 0.20)",
  },
  primary: {
    background: `${Common.color.purpleGrad03}`,
    backgroundHover: `${Common.color.purpleGradDark03}`,
    color: `${Common.color.white01}`,
    boxShadow: "3px 3px 6px 1px rgba(102, 71, 214, 0.20)",
  },
  secondary: {
    background: `${Common.color.purpleGrad01}`,
    backgroundHover: `${Common.color.purpleGradDark01}`,
    color: `${Common.color.purple04}`,
    boxShadow: "3px 3px 6px 1px rgba(150, 105, 249, 0.20)",
  },
};

export const StyledButton = styled.button`
  margin: ${({ margin }) => margin || "0 0 0 0"};
  width: ${({ width }) => width || "auto"};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  height: 50px;
  cursor: pointer;
  border: none;
  border-radius: ${({ radius }) => radius || "16px"};
  box-shadow: 3px 3px 6px 1px rgba(102, 71, 214, 0.2);
  background: ${({ variant }) => variants[variant].background};
  color: ${({ variant }) => variants[variant].color};

  &:hover {
    background: ${({ variant }) => variants[variant].backgroundHover};
  }
`;
