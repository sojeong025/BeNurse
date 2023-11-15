import styled from "@emotion/styled";

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
