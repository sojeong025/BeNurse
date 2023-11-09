import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const Select = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  & .header {
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  h1 {
    font-size: ${Common.fontSize.fontM};
    color: ${Common.color.purple04};
    font-weight: ${Common.fontWeight.extrabold};
  }
  p {
    padding-top: 4px;
    font-size: ${Common.fontSize.fontXS};
    color: ${Common.color.black03};
    font-weight: ${Common.fontWeight.bold};
  }
`;
