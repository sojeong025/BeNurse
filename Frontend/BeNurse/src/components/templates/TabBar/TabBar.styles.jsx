import styled from "@emotion/styled";
import { Common } from "/src/utils/global.styles.jsx";

export const StyledTabBar = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;
  display: ${({ display }) => display};
  justify-content: space-around;
  align-items: center;
  padding: 0px 10px;
  width: 392px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px -4px 4px 0px rgba(137, 137, 137, 0.1);
`;

export const styledTabBarIcon = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  & img {
    width: 18px;
    height: 18px;
    color: ${Common.color.black02};
  }
  & span {
    margin-top: 4px;
    font-size: ${Common.fontSize.fontXS};
    font-weight: ${Common.fontWeight.bold};
    color: ${Common.color.black02};
  }
`;
