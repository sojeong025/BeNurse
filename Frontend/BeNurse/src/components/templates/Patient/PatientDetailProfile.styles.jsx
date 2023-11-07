import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const PatientDetailProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;

  & .patient_image {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
  & .patient_name {
    font-weight: ${Common.fontWeight.extrabold};
  }

  & .patient_ageGen {
    font-size: ${Common.fontSize.fontS};
    font-weight: ${Common.fontWeight.bold};
  }

  & .patient_info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 12px;
    font-size: ${Common.fontSize.fontXS};
    font-weight: ${Common.fontWeight.bold};
  }
`;

export const PatientDetailInfoWrapper = styled.div``;
