import styled from "@emotion/styled";
import { Common } from "../../utils/global.styles";

export const StateWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const State = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;

  &::before {
    content: "";
    width: 13px;
    height: 13px;
    border-radius: 100%;
    background-color: ${({ type }) => {
      switch (type) {
        case "D":
          return Common.color.day;
        case "E":
          return Common.color.evening;
        case "N":
          return Common.color.night;
        case "O":
          return Common.color.off;
      }
    }};
    margin-right: 3px;
  }
`;
