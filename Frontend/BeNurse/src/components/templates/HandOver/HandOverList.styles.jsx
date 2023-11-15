import styled from "@emotion/styled";
import { Common } from "../../../utils/global.styles";

export const HandOverContainer = styled.div`
  height: 600px;
  overflow: scroll;
  width: calc(100% - 28px);
  margin: 0 auto;
  /* border: 1px solid black; */
`;

export const HandOverItem = styled.div`
  /* border: 1px solid black; */
  display: flex;
`;

export const HandOverItemLeft = styled.div`
  margin-left: 16px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 4px;

  & .handoverTitle {
    font-size: ${Common.fontSize.fontS};
    font-weight: ${Common.fontWeight.bold};
  }

  & .handoverNurseName {
    font-size: ${Common.fontSize.fontXS};
  }
`;
