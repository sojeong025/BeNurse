import styled from "@emotion/styled";
import { Common } from "../../../utils/global.styles";

export const CalendarWrapper = styled.div`
  width: calc(412px - 28px);
  margin-top: 74px;
`;

export const Header = styled.div`
  background-color: ${Common.color.purple03};
  display: flex;
  justify-content: space-between;
  height: 70px;
  line-height: 32px;
  font-weight: ${Common.fontWeight.extrabold};
  align-items: center;
  border-radius: 0 0 25px 25px;
  border-top: 1px solid ${Common.color.purple03};
  margin-left: -14px;
  padding: 0px 25px;
  width: calc(100% - 22px);
  h2 {
    font-size: ${Common.fontSize.fontL};
    font-weight: ${Common.fontWeight.extrabold};
    color: #ffffff;
  }
  button {
    border: none;
    background-color: transparent;
    font-size: 30px;
    color: #ffffff;
  }
`;

export const StateWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0px 10px 8px;
`;

export const State = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  mix-blend-mode: 20px;

  &::before {
    content: "";
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background-color: ${({ type }) => {
      switch (type) {
        case "day":
          return Common.color.day;
        case "evening":
          return Common.color.evening;
        case "night":
          return Common.color.night;
        case "off":
          return Common.color.off;
      }
    }};
    margin-right: 5px;
  }
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
  padding: 10px;
  border-bottom: ${({ lastRow }) => (lastRow ? "none" : "1px solid #ddd")};
  color: ${({ isCurMonth }) => (isCurMonth ? "black" : "lightgray")};
`;
