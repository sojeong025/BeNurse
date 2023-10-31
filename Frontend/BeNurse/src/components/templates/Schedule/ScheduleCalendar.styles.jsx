import styled from "@emotion/styled";
import { Common } from "../../../utils/global.styles";

export const CalendarWrapper = styled.div`
  width: calc(412px - 28px);
  /* margin-top: 74px; */
`;

export const Header = styled.div`
  background-color: ${Common.color.purple03};
  display: flex;
  justify-content: space-between;
  height: 71px;
  line-height: 28px;
  font-weight: ${Common.fontWeight.extrabold};
  align-items: center;
  border-radius: 0 0 25px 25px;
  border-top: 1px solid ${Common.color.purple03};
  margin-top: -1px;
  margin-left: -14px;
  padding: 0px 24px 0 20px;
  width: calc(100% - 16px);
  h2 {
    font-size: ${Common.fontSize.fontM};
    font-weight: ${Common.fontWeight.bold};
    color: #ffffff;
  }
  button {
    padding: 0;
    border: none;
    background-color: transparent;
    font-size: 28px;
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
  font-size: 10px;

  &::before {
    content: "";
    width: 13px;
    height: 13px;
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
    margin-right: 3px;
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
  padding: 10px 0px;
  border-bottom: ${({ lastRow }) => (lastRow ? "none" : "1px solid #ddd")};
  color: ${({ isCurMonth, isSunday }) =>
    isCurMonth ? (isSunday ? "red" : "black") : "lightgray"};
`;

export const ScheduleTypeCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #ffffff;
  font-weight: ${Common.fontWeight.bold};
  width: 38px;
  height: 38px;
  border-radius: 100%;
  margin-top: 10px;
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
`;

export const CheckBox = styled.label`
  position: relative;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    display: flex;
    left: 15px;
    height: 24px;
    width: 24px;
    border-radius: 4px;
    background-color: #e9e2ff;
    color: #d1c1ff;
    transition-duration: 0.4s;
  }

  input:checked + span {
    // 체크 후 배경색 변경
    background-color: #6647d6;
    color: #d0bfff;
  }
`;

export const NurseScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 14px;
  height: 510px;
  gap: 14px;
  overflow: scroll;
`;
