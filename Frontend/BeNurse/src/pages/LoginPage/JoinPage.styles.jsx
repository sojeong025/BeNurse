import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

const variants = {
  hospital: {
    background: `${Common.color.white01}`,
    backgroundHover: `${Common.color.white02}`,
    mainColor: `${Common.color.purple04}`,
    subColor: `${Common.color.black01}`,
    boxShadow: "0px 3px 6px 4px rgba(187, 187, 187, 0.20)",
  },
  nurse: {
    background: `${Common.color.purpleGrad02}`,
    backgroundHover: `${Common.color.purpleGradDark02}`,
    mainColor: `${Common.color.white01}`,
    subColor: `${Common.color.purple01}`,
    boxShadow: "0px 3px 6px 1px rgba(150, 105, 249, 0.20)",
  },
};

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 60px);
  padding: 14px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 40px;
`;

export const MainButton = styled.div`
  background: ${({ variant }) => variants[variant].background};
  color: ${({ variant }) => variants[variant].mainColor};
  border-radius: 20px;
  text-align: left;
  width: 100%;
  height: 150px;
  margin: auto;
  padding: 20px 15px;
  box-sizing: border-box;
  box-shadow: ${({ variant }) => variants[variant].boxShadow};

  &:hover {
    background: ${({ variant }) => variants[variant].backgroundHover};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 15px;
`;

export const buttonTitle = styled.p`
  display: flex;
  gap: 10px;
  font-weight: ${Common.fontWeight.extrabold};
  font-size: ${Common.fontSize.fontL};
`;

export const buttonDesc = styled.p`
  padding-top: 10px;
  font-size: ${Common.fontSize.fontS};
  line-height: ${Common.fontSize.fontXL};
  font-weight: ${Common.fontWeight.bold};
  margin-bottom: 10px;
  color: ${({ variant }) => variants[variant].subColor};
`;
