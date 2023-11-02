import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const SelectContainer = styled.div`
  display: flex;
  gap: 10px;

  & input {
    color: ${Common.color.white01} !important;
  }

  & .ant-select:hover .ant-select-selector {
    box-shadow: none !important;
    border-color: transparent !important;
  }

  & .ant-select-selection-placeholder,
  .ant-select-selection-item {
    font-size: ${Common.fontSize.fontS} !important;
    color: ${Common.color.white01} !important;
  }
  & .ant-select {
    z-index: 0 !important;
    min-width: 90px;
  }
  & .ant-select-selector {
    border-radius: 10px !important;
  }
  & .ant-select-arrow {
    color: ${Common.color.white02};
  }
  & .ant-select-selection-item {
    color: ${Common.color.white01};
  }
`;
