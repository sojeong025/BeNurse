import styled from "@emotion/styled";
import { Common } from "@utils/global.styles.jsx";
import { Tabs } from "antd";

export const StyledDiv = styled.div`
  width: 100%;
  margin-top: 84px;
  &&
    :where(.css-dev-only-do-not-override-xu9wm8).ant-tabs
    .ant-tabs-tab.ant-tabs-tab-active
    .ant-tabs-tab-btn {
    font-size: ${Common.fontSize.fontM};
    color: ${Common.color.purple04};
  }
  && :where(.css-dev-only-do-not-override-xu9wm8).ant-tabs .ant-tabs-ink-bar {
    background: ${Common.color.purple04};
  }
`;
