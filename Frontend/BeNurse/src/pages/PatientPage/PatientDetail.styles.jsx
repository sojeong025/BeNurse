import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const PatientDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 50px;
`;

export const PatientDetailItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 14px 0;
  margin-top: 18px;
  border-left: 3px solid ${Common.color.purple04};
  gap: 12px;
  padding-left: 10px;
`;
