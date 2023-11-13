import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const StyledHr = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 96%;
  background-color: #00000011;
  height: 1px;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 130px;
  background-color: ${Common.color.purple00};
  border-top-left-radius: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: -65px;
  justify-content: space-evenly;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px 0;
`;

export const ButtonContent = styled.div`
  & > svg {
    width: 1.5em;
    height: 1.5em;
  }
  & > div {
    font-size: ${Common.fontSize.fontS};
    font-weight: ${Common.fontWeight.bold};
  }
`;

export const MainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
  font-size: ${Common.fontSize.fontM};
  font-weight: ${Common.fontWeight.extrabold};
  color: ${Common.color.black03};
  & > a {
    font-size: ${Common.fontSize.fontS};
    font-weight: ${Common.fontWeight.bold};
    color: ${Common.color.black01};
    padding-right: 5px;
  }
`;

export const scheduleDayBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  height: 100%;
  padding: 14px 0;
  box-sizing: border-box;
  width: 100%;
`;

export const scheduleDay = styled.div`
  height: 100%;
  color: ${Common.color.black03};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & .day {
    font-size: ${Common.fontSize.fontXXS};
    font-weight: ${Common.fontWeight.extrabold};
  }
  & .date {
    font-size: ${Common.fontSize.fontXXS};
    font-weight: ${Common.fontWeight.bold};
  }
  & .type {
    width: 43px;
    height: 62px;
    color: ${Common.color.white01};
    font-size: ${Common.fontSize.fontXXS};
    font-weight: ${Common.fontWeight.extrabold};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: ${({ type }) => {
      if (type === "D") {
        return Common.color.day;
      } else if (type === "N") {
        return Common.color.night;
      } else if (type === "E") {
        return Common.color.evening;
      } else {
        return Common.color.off;
      }
    }};
  }
`;

export const TipBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 15px;
  box-sizing: border-box;
  & > div {
    flex: 0 0 auto;
  }
  padding-left: 14px;
  padding-bottom: 15px;
  padding-right: 14px;
`;

export const TipBox = styled.div`
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
  justify-content: space-evenly;
  & svg {
    width: 1.6em;
    height: 1.6em;
    color: #ffd261;
  }
  & .title {
    font-weight: ${Common.fontWeight.bold};
    font-size: ${Common.fontSize.fontS};
    margin-bottom: 8px;
  }
  & .desc {
    font-weight: ${Common.fontWeight.regular};
    font-size: ${Common.fontSize.fontXS};
  }
`;
