import React from "react";
import { Common } from "../../utils/global.styles";
import HandOverSendList from "../../components/templates/HandOver/HandOverSendList";
import HandOverGiveList from "../../components/templates/HandOver/HandOverGiveList";

import Container from "../../components/atoms/Container/Container";
import Box from "@components/atoms/Box/Box";

import * as S from "./HandOverListPage.styles";

import { Tabs } from "antd";

// Icons
import HandOverItem from "@assets/Icons/handoveritem.svg";

// Images
import nurse from "@assets/Images/patient_temp.png";

const onChange = (key) => {};

const items = [
  {
    key: "1",
    label: "받은 인계장",
    children: <HandOverGiveList />,
  },
  {
    key: "2",
    label: "보낸 인계장",
    children: <HandOverSendList />,
  },
];

export default function HandOverListPage() {
  return (
    <Container>
      <S.StyledDiv>
        <Tabs
          style={{ overflow: "scroll" }}
          defaultActiveKey="1"
          centered
          size="large"
          tabBarStyle={{}}
          tabBarGutter={150}
          indicatorSize={200}
          items={items}
          onChange={onChange}
        />
      </S.StyledDiv>
    </Container>
  );
}
