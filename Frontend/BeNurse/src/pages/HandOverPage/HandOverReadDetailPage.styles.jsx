import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";
import exp from "constants";

export const SwiperMain = styled.div`
  width: 340px;
  padding: 20px;

  border-bottom: 1px solid ${Common.color.purple02};
  height: 89px;
  & .title {
    font-size: ${Common.fontSize.fontM};
    font-weight: ${Common.fontWeight.extrabold};
    margin-bottom: 8px;
    color: ${Common.color.purple04};
  }

  & .context {
    font-size: ${Common.fontSize.fontXS};
    line-height: 20px;
  }
`;

export const SwiperContainer = styled.div`
  height: 460px;
  padding: 10px 20px;
  /* border: 1px solid black; */
`;

export const handovercontent = styled.div`
  display: flex;
  flex-direction: column;
  /* box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
  border-bottom: 1px solid lightgray;
  width: 344px;
  justify-content: center;
  padding: 20px 0 20px 0;
  font-size: ${Common.fontSize.fontS};
  word-break: keep-all;
  line-height: 22px;

  & .icon {
    color: ${Common.color.purple04};
    font-size: ${Common.fontSize.fontM};
    margin-right: 8px;
  }
`;

export const nursingLog = styled.div`
  /* display: flex; */
  padding: 10px;
  margin-bottom: 14px;
  border-radius: 10px;
  background-color: #c4afff1c;
  box-shadow: 2px 2px 5px 0 #c4afff71;

  & .journal_type {
    background: ${({ type }) =>
      type == "활력징후"
        ? "#c4d3ff"
        : type == "검사 전후 간호"
        ? "#fff5cf"
        : type == "수술 전후 간호"
        ? "#e2ffee"
        : type == "환자 상태"
        ? "#ffd6d6"
        : type == "교육"
        ? "#ebebeb"
        : Common.color.purpleGrad01};
    padding: 4px 10px;
    border-radius: 10px;
    color: ${Common.color.black03};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  & .journal_content {
    font-size: ${Common.fontSize.fontS};
    margin-bottom: 6px;
  }

  & .time_label {
    color: ${Common.color.black01};
    font-size: ${Common.fontSize.fontXS};
  }

  & .journal_nursename {
    color: ${Common.color.black01};
    font-size: ${Common.fontSize.fontXS};
  }
`;
