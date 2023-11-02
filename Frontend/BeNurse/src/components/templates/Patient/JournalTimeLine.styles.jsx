import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const TimeLineContainer = styled.div`
  padding-top: 10px;
  height: calc(100% - 220px);
  overflow-y: auto;
  width: 100%;
`;

export const JournalItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 50px;
  min-height: calc(100% - 60px);

  & > .timeline-border {
    position: absolute;
    top: 0;
    left: 21px;
    height: 101%;
    border-left: 2px solid ${Common.color.purple04};
    margin-top: -14px;
  }
`;
