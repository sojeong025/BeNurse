import React from "react";

import { BsCheck } from "react-icons/bs";
import nurse from "@assets/Images/patient_temp.png";

import * as S from "./HandOverNurseSelectItem.styles";

export default function HandOverNurseSelectItem() {
  return (
    <S.NurseListContainer>
      <S.NurseProfile>
        <img
          className="nurse_img"
          src={nurse}
          alt=""
        />
        <div>
          <p className="nurse_name">정소정 간호사</p>
          <p className="nurse_work">내과 병동 2년차</p>
        </div>
      </S.NurseProfile>
      <S.CheckBox>
        <input type="checkbox" />
        <span>
          <BsCheck size={24} />
        </span>
      </S.CheckBox>
    </S.NurseListContainer>
  );
}
