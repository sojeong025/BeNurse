import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const StepBox = styled.div`
  width: calc(100% - 80px);
  margin: 0 auto;
  .ant-steps
    .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title::after {
    background-color: ${Common.color.purple03} !important;
  }
  .ant-steps-item-active .ant-steps-item-icon {
    background-color: ${Common.color.purple03} !important;
    border-color: ${Common.color.purple03} !important;
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: ${Common.color.purple01} !important;
    border-color: ${Common.color.purple01} !important;
  }

  .ant-steps-finish-icon > svg {
    fill: ${Common.color.purple03};
  }

  .ant-steps-item-icon {
  }

  span.ant-steps-icon {
    font-size: ${Common.fontSize.fontS};
    font-family: "NanumSquareNeo";
  }
`;
