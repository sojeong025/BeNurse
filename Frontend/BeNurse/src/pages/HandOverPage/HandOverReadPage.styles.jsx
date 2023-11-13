import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const HandoverList = styled.div`
  width: 384px;
  height: 50px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  & .handovertitle {
    font-size: ${Common.fontSize.fontM};
    font-weight: ${Common.fontWeight.bold};
    margin-bottom: 10px;
  }

  & .handovercontext {
    font-size: ${Common.fontSize.fontS};
  }
`;

export const HandoverPatient = styled.div`
  display: flex;
  justify-content: space-between;
  width: 352px;
  height: 60px;
  margin-bottom: 20px;
  background-color: ${Common.color.purple01};
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: 10px;
  padding: 16px;

  & .icon {
    margin-right: 20px;
  }
`;

export const HandoverPatientLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Patient = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  font-size: ${Common.fontSize.fontM};
  font-weight: ${Common.fontWeight.bold};
`;

export const HandoverPatientRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;
