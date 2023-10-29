import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const StyledBox = styled.div`
  display: flex;
  justify-content: ${({ flex }) => (flex !== undefined ? flex[0] : "center")};
  align-items: ${({ flex }) => (flex !== undefined ? flex[1] : "center")};
  margin: ${({ margin }) => margin || "0 0 0 0"};
  border: ${({ border }) =>
    border === true ? "0px 0px 1px 0px solid #777777" : null};
  border-radius: ${({ type }) => (type === "transparent" ? "0px" : "16px")};
  width: ${({ size }) => size[0]};
  height: ${({ size }) => size[1]};
  background-color: ${({ type }) =>
    type === "purple01"
      ? Common.color.purple01
      : type === "purple02"
      ? Common.color.purple02
      : type === "purple03"
      ? Common.color.purple03
      : type === "white"
      ? Common.color.white01
      : type === "transparent" && null};
  color: ${({ type }) =>
    type === "purple01"
      ? Common.color.black02
      : type === "purple02"
      ? Common.color.black03
      : type === "purple03"
      ? Common.color.white01
      : type === "white"
      ? Common.color.black03
      : type === "transparent" && Common.color.black03};
  box-shadow: ${({ type }) =>
    type === "purple01"
      ? "3px 6px 3px 1px rgba(150, 105, 249, 0.2)"
      : type === "purple02"
      ? "3px 6px 3px 1px rgba(102, 71, 214, 0.2)"
      : type === "purple03"
      ? "3px 6px 3px 1px rgba(102, 71, 214, 0.2)"
      : type === "white"
      ? "3px 6px 3px 4px rgba(187, 187, 187, 0.2)"
      : type === "transparent" && null};
  font-size: ${({ font }) => font};
  overflow: ${({ overflow }) => overflow};
`;
