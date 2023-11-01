import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const MainContainer = styled.div`
  width: 100%;
`;

export const HorizontalDatePicker = styled.div`
  margin-top: 73px;
  padding-bottom: 10px;
  height: 115px;
  width: 100%;
  background-color: ${Common.color.purple03};
  border-radius: 0 0 15px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  overflow: hidden;
  position: relative;
  z-index: 3;

  & .date_yymm {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    color: ${Common.color.white01};
    font-size: ${Common.fontSize.fontS};
    font-weight: ${Common.fontWeight.bold};
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 30px;
    bottom: 0;
    width: 30px;
    height: 90px;
    background: linear-gradient(
      to left,
      ${Common.color.purple03},
      rgba(255, 255, 255, 0)
    );
  }

  &::before {
    z-index: 9;
    left: 0;
    transform: rotateZ(180deg);
  }

  &::after {
    right: 0;
  }
`;

export const MonthButton = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: transparent;
  border: none;
  color: ${Common.color.white01};
  & svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

export const DateButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  width: 100%;
  /* scroll-snap-type: x mandatory; */
  position: relative;
`;

export const DateButton = styled.div`
  min-width: calc(100% / 8);
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
  color: ${Common.color.white01};
  font-size: ${Common.fontSize.fontS};
  font-weight: ${Common.fontWeight.bold};

  & > p:first-child {
    font-size: 10px;
  }

  &.active {
    /* background-color: ${Common.color.white01}; */
    z-index: 100;
    font-size: 16px;
    color: ${Common.color.black03};
    border-radius: 7px;
  }
`;

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
