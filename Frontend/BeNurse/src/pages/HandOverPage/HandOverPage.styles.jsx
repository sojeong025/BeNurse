import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const NurseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  & .nurse-image {
    width: 46.5px;
  }

  & .nurse-info {
    display: flex;
    flex-direction: column;
    font-size: ${Common.fontSize.fontXXS};
    line-height: 17px;

    h5 {
      font-size: 9px;
    }
  }
`;

export const TemporaryBox = styled.div`
  margin-bottom: 30px;

  & .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 18%;
  }

  & .list-count {
    color: ${Common.color.white01};
    position: relative;
    z-index: 1;
    &::before {
      content: "";
      width: 30px;
      height: 30px;
      border-radius: 100%;
      background-color: ${Common.color.purple03};
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  & .arrow {
    font-size: 40px;
    color: ${Common.color.black01};
    padding-top: 6px;
  }
`;

export const HandoverList = styled.div`
  display: flex;
  & .temporary-container {
    margin: 18px;
  }

  & .handover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-bottom: 20px;
    color: ${Common.color.black02};

    h2 {
      font-size: ${Common.fontSize.fontL};
    }
    h5 {
      font-size: ${Common.fontSize.fontS};
    }
  }
`;
