import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const MainContainer = styled.div`
  padding-top: 74px;
  padding-bottom: 80px;
  width: 100%;
  height: 810px;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const TopContainer = styled.div`
  background-color: ${Common.color.purple00};
  color: ${Common.color.black03};
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  & .top-container-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
  }
  & .profile_image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 1px solid #d9d9d9;
  }
  & .profile_name {
    font-size: ${Common.fontSize.fontL};
    font-weight: ${Common.fontWeight.bold};
  }

  & .profile_workplace {
    font-size: ${Common.fontSize.fontS};
    font-weight: ${Common.fontWeight.bold};
    display: flex;
    gap: 5px;
  }
`;

export const ChangeHospitalBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: ${Common.color.purple01};
  color: ${Common.color.black03};
  margin: 14px;
  padding: 20px 0;
  border-radius: 10px;
  box-sizing: border-box;
  & p:first-child {
    font-size: ${Common.fontSize.fontS};
    font-weight: ${Common.fontWeight.extrabold};
    margin-bottom: 10px;
  }
  & p:last-child {
    font-size: ${Common.fontSize.fontXS};
    font-weight: ${Common.fontWeight.bold};
  }
  & .arrow-chip {
    background: #d0bfff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #6647d6;
    margin-right: 24px;
    width: 24px;
    height: 24px;
  }

  & .arrow-chip > svg {
    width: 1.4em;
    height: 1.4em;
  }
`;

export const MyPageList = styled.div`
  border-bottom: 1px solid #d9d9d9;

  & > a {
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${Common.color.black03};
  }

  padding: 0 28px;
  font-size: ${Common.fontSize.fontS};

  & > a > div {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  & svg {
    width: 1.6em;
    height: 1.6em;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 14px;
`;

export const MyPageAuthBtn = styled.button`
  width: calc(100% - 56px);
  height: 44px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  background-color: ${Common.color.white01};
  color: #a9a9a9;
  font-size: ${Common.fontSize.fontS};
  &:hover {
    background-color: ${Common.color.white02};
  }
`;
