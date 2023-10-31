import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const MainContainer = styled.div`
  padding: 74px 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`;

export const NoticeLable = styled.div`
  padding-top: 10px;
  color: ${Common.color.black03};
  border-bottom: 1px solid #e0e0e0;

  & .notice_header {
    padding: 15px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .notice_title {
    font-size: ${Common.fontSize.fontS};
    font-weight: ${Common.fontWeight.bold};
  }
  & .arrow_icon {
    transition: all 0.3s;
  }

  & .notice_bottom {
    padding: 20px;
    transition: all 0.3s;
    transition-delay: 0.3s;
  }
  & .notice_content {
    opacity: 0;
    height: 10px;
    margin-top: -20px;
    overflow: hidden;
    font-size: ${Common.fontSize.fontS};
    transition: all ease-in-out 0.3s;
    line-height: 28px;
  }
  & .notice_info {
    font-size: ${Common.fontSize.fontXS};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .notice_info > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  & svg {
    width: 1.4em;
    height: 1.4em;
  }
  & .active .notice_bottom {
    background-color: #f8f8f8;
    overflow: auto;
  }
  & .active .notice_content {
    opacity: 1;
    height: max-content;
    line-height: 28px;
    margin-top: 0px;
    margin-bottom: 20px;
  }
  & .active .arrow_icon {
    transition: all 0.3s;
    transform: rotate(90deg);
  }
`;

export const WriteContainer = styled.div`
  padding: 84px 14px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const WriteTitleInput = styled.input`
  padding: 12px;
  background-color: ${Common.color.purple00};
  margin-top: 5px;
  height: 50px;
  border-radius: 8px;
  border: none;
  box-sizing: border-box;
  font-size: ${Common.fontSize.fontS};
  &:focus-visible {
    box-shadow: inset 1px 1px 5px rgba(1, 1, 0, 0.15);
  }
`;

export const WriteContentInput = styled.textarea`
  padding: 12px;
  background-color: ${Common.color.purple00};
  border-radius: 8px;
  border: none;
  height: calc(100% - 140px);
  box-sizing: border-box;
  font-size: ${Common.fontSize.fontS};
  line-height: 28px;
  &:focus-visible {
    box-shadow: inset 1px 1px 5px rgba(1, 1, 0, 0.15);
  }
`;
