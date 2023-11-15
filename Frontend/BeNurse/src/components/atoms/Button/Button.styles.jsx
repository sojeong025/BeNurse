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
  danger: {
    background: "linear-gradient(273deg, #ff3f52 14.46%, #ff3247 33.04%)",
    backgroundHover: "linear-gradient(273deg, #f23c4f 14.46%, #ef2e41 33.04%)",
    color: `${Common.color.white01}`,
    boxShadow: "3px 3px 6px 4px rgba(84, 84, 84, 0.2)",
  },
  disabled: {
    background: "F7F7F7",
    color: `${Common.color.black01}`,
  },
};

export const StyledButton = styled.button`
  margin: ${({ margin }) => margin || "0 0 0 0"};
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "50px"};
  font-size: ${({ variant }) =>
    variant == "danger" ? Common.fontSize.fontS : Common.fontSize.fontM};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
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
