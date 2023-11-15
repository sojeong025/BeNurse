import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const WriteContainer = styled.div`
  width: 100%;
  height: calc(100% - 223px);
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WriteTypeSelect = styled.div`
  width: 100%;
  & .ant-select-lg {
    width: 100% !important;
    height: 50px;
  }
  & .ant-select-selector {
    border: none !important;
    font-size: ${Common.fontSize.fontS} !important;
  }
  & .ant-select-open .ant-select-selector {
    box-shadow: inset 1px 1px 5px rgba(1, 1, 0, 0.15) !important;
  }
`;

export const WriteContentInput = styled.textarea`
  padding: 12px;
  height: calc(100% - 160px);
  background-color: ${Common.color.purple00};
  border-radius: 8px;
  border: none;
  box-sizing: border-box;
  font-size: ${Common.fontSize.fontS};
  line-height: 28px;
  &:focus-visible {
    box-shadow: inset 1px 1px 5px rgba(1, 1, 0, 0.15);
  }
`;
