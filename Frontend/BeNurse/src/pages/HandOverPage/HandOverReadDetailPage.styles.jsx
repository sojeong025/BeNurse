import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

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
  padding: 20px;
  /* border: 1px solid black; */
`;

export const etc = styled.div`
  display: flex;
  flex-direction: column;
  /* box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
  border-bottom: 1px solid lightgray;
  width: 344px;
  margin-bottom: 16px;
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
