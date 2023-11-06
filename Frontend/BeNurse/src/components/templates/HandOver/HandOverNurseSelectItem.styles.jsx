import styled from "@emotion/styled";
import { Common } from "../../../utils/global.styles";

export const NurseListContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${Common.color.black01};
  padding: 15px 0;
`;

export const NurseProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;

  & .nurse_img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  & .nurse_name {
    font-size: 14px;
    margin-bottom: 5px;
  }

  & .nurse_work {
    font-size: 12px;
  }
`;

export const CheckBox = styled.label`
  cursor: pointer;
  margin-top: -20px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  span {
    display: flex;
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
