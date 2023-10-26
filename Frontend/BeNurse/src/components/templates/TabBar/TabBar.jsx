import React from "react";

// Icons
import schedule from "@assets/Icons/schedule.svg";
import handover from "@assets/Icons/handover.svg";
import main from "@assets/Icons/main.svg";
import patient from "@assets/Icons/patient.svg";
import device from "@assets/Icons/device.svg";

// emotion
import * as S from "./TabBar.styles";

export default function TabBar() {
  return (
    <S.StyledTabBar>
      <S.styledTabBarIcon>
        <img
          src={schedule}
          alt=""
        />
        <span>근무 관리</span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon>
        <img
          src={handover}
          alt=""
        />
        <span>인수인계</span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon>
        <img
          src={main}
          alt=""
        />
        <span>메인</span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon>
        <img
          src={patient}
          alt=""
        />
        <span>환자 관리</span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon>
        <img
          src={device}
          alt=""
        />
        <span>장비 관리</span>
      </S.styledTabBarIcon>
    </S.StyledTabBar>
  );
}
