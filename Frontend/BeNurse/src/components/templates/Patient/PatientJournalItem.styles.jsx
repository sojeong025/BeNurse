import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const StyledJournalItem = styled.div`
  display: flex;
  gap: 14px;
  z-index: 1;
  margin: 10px 0 20px 0;
  width: calc(100% - 28px);
`;

export const TimeChip = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
  gap: 5px;
  font-size: ${Common.fontSize.fontXS};
  font-weight: ${Common.fontWeight.bold};
  & > .time_point {
    width: 16px;
    height: 16px;
    background: #956eff;
    border-radius: 50%;
  }
`;

export const JournalContentBox = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  max-height: ${({ isSelected }) => (isSelected ? "1000px" : "60px")};
  box-shadow: 2px 2px 5px 0 #c4afff71;
  background-color: #c4afff1c;
  border-radius: 12px;
  margin-top: -6px;
  transition: all 0.5s ease-in-out;

  & > .journal_top {
    font-size: ${Common.fontSize.fontXS};
    letter-spacing: 0.4px;
    line-height: 22px;
    overflow: hidden;
  }

  & > .journal_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: ${Common.fontSize.fontXXS};
    color: ${Common.color.black01};
  }

  & .journal_type {
    background: ${Common.color.purpleGrad01};
    padding: 4px 10px;
    border-radius: 10px;
    color: ${Common.color.black03};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
