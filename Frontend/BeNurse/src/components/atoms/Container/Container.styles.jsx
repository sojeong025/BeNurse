import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const StyledContainer = styled.div`
  display: flex;
  width: 412px;
  height: 700px;
  padding-top: 74px;
  position: relative;
  background-color: ${({ backgroundColor }) =>
    backgroundColor === "white"
      ? Common.color.white01
      : backgroundColor === "purple"
      ? "#E7E6F5"
      : ""};
  overflow: scroll;
  & ::-webkit-scrollbar {
    display: none;
  }
`;
