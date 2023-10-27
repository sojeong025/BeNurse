import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const TitleText = styled.div`
  text-align: center;
  color: ${Common.color.black03};
  font-size: ${Common.fontSize.fontXL};
  font-weight: ${Common.fontWeight.extrabold};
  margin-bottom: 10px;
`;

export const DescText = styled.div`
  text-align: center;
  color: ${Common.color.black02};
  font-weight: ${Common.fontWeight.bold};
`;
