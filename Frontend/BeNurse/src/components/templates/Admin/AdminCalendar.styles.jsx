import styled from "@emotion/styled";
import { Common } from "../../../utils/global.styles";
import { keyframes } from "@emotion/react";

export const CalendarWrapper = styled.div`
  width: calc(412px - 28px);
  /* margin-top: 74px; */
`;

export const WeekdayRow = styled.tr`
  height: 30px;
  line-height: 30px;
  padding: 10px;
`;

export const Weekday = styled.th`
  font-size: 15px;
  width: calc((412px - 28px) / 7);
  padding: 10px;
`;

export const Table = styled.table`
  width: 100%;
  text-align: center;
`;

export const Td = styled.td`
  font-size: 12px;
  width: calc((412px - 28px) / 7);
  height: 60px;
  padding: 10px 0px;
  border-bottom: ${({ lastRow }) => (lastRow ? "none" : "1px solid #ddd")};
  color: ${({ isCurMonth, isSunday }) =>
    isCurMonth ? (isSunday ? "red" : "black") : "lightgray"};
`;

const appear = keyframes`
  from, 0%, to{
    transform: scale(0.6)
  }

  50% {
    transform: scale(1.2)
  }

  100% {
    transform: scale(1)
  }
`;

export const SelectCircle = styled.div`
  animation: ${appear} 0.2s ease-in-out;
  width: 24px;
  height: 24px;
  margin-top: 16px;
  border-radius: 30px;
  background-color: ${Common.color.purple03};
`;
