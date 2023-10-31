import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const PanelButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 70px;
  padding-left: 25px;

  & > span {
    color: ${Common.color.black02};
    font-size: ${Common.fontSize.fontS};
    font-weight: ${Common.fontWeight.bold};
  }
`;
