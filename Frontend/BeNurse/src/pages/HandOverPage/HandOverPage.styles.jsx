import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";

export const WorkPart = styled.div`
  & .title {
    font-size: ${Common.fontSize.fontS};
    color: ${Common.color.black02};
    margin-bottom: 10px;
    font-weight: ${Common.fontWeight.bold};
  }

  & .nurse-list {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  & .nurse-image {
    width: 20px;
    /* border: 1px solid #696969; */
    border-radius: 100%;
  }

  & .nurse-info {
    display: flex;
    flex-direction: column;
    font-size: ${Common.fontSize.fontXXS};
    line-height: 14px;
    margin-left: 5px;

    h5 {
      font-size: 9px;
      color: ${Common.color.purple04};
      font-weight: ${Common.fontWeight.bold};
    }
  }
`;

export const TemporaryBox = styled.div`
  margin-bottom: 30px;

  & .temporary-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  & .temporary-title {
    margin-left: 36px;
    font-weight: ${Common.fontWeight.bold};
  }

  & .right {
    display: flex;
    align-items: center;
  }

  & .list-count {
    color: ${Common.color.white01};
    position: relative;
    z-index: 1;
    &::before {
      content: "";
      width: 28px;
      height: 28px;
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
    font-size: 30px;
    color: ${Common.color.black01};
    padding-top: 6px;
    margin: 0 20px;
  }
`;

export const HandoverList = styled.div`
  & .temporary-container {
    margin: 5px 10px;
  }

  & .handover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${Common.color.black02};
    margin-bottom: 10px;
    margin-right: 5px;

    & .title {
      font-size: ${Common.fontSize.fontS};
      color: ${Common.color.black02};
      font-weight: ${Common.fontWeight.bold};
    }

    h5 {
      font-size: ${Common.fontSize.fontXS};
      color: ${Common.color.black02};
    }
  }
`;
