import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: ${({ flex }) => (flex ? flex[0] : null)};
  align-items: ${({ flex }) => (flex ? flex[1] : null)};
  width: 412px;
  height: 820px;
  position: relative;
  background-color: ${({ backgroundColor }) =>
    backgroundColor === "white"
      ? Common.color.white01
      : backgroundColor === "purple"
      ? "#E7E6F5"
      : ""};
  overflow: ${({ overflow }) => overflow};
  ${({ props }) => props}
`;
