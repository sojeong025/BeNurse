import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const StyledDrawer = styled.div`
  position: absolute;
  bottom: -28px;
  right: -13px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 412px;
  height: 184px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${Common.color.white01};
`;
