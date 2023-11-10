import React, { useEffect, useState } from "react";

import { BsCheck } from "react-icons/bs";
import nurseImg from "@assets/Images/patient_temp.png";

import { customAxios } from "../../../libs/axios";

import * as S from "./HandOverNurseSelectItem.styles";

export default function HandOverNurseSelectItem({ onSelectChange }) {
  const [sendNurseInfo, setSendNurseInfo] = useState([]);
  const [myId, setMyId] = useState();
  const [wardId, setWardId] = useState();
  const [wardName, setWardName] = useState();
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckChange = (e, id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: e.target.checked,
    }));
    console.log("선택된 간호사 아이디 체크", checkedItems);
  };

  useEffect(() => {
    const checkedNurseIds = Object.keys(checkedItems).filter(
      (id) => checkedItems[id],
    );
    onSelectChange(checkedNurseIds);
  }, [checkedItems]);

  useEffect(() => {
    customAxios.get("nurse/me").then((res) => {
      console.log(res);
      setWardName(res.data.responseData.wardName);
      setWardId(res.data.responseData.wardID);
      setMyId(res.data.responseData.id);
    });
  }, []);

  useEffect(() => {
    if (wardId) {
      customAxios
        .get("nurse/ward", {
          params: {
            ID: wardId,
          },
        })
        .then((res) => {
          console.log(res);
          Array.isArray(res.data.responseData)
            ? setSendNurseInfo(res.data.responseData)
            : setSendNurseInfo([res.data.responseData]);
        });
    }
  }, [wardId]);

  return (
    <S.NurseListContainer>
      {sendNurseInfo.map((nurse, index) => (
        <React.Fragment key={index}>
          <S.NurseContainer>
            <S.NurseProfile>
              <img
                className="nurse_img"
                src={nurseImg}
                alt=""
              />
              <div>
                <p className="nurse_name">{nurse.name} 간호사</p>
                <p className="nurse_work">
                  {wardName} {nurse.annual}년차
                </p>
              </div>
            </S.NurseProfile>
            <S.CheckBox>
              <input
                type="checkbox"
                onChange={(event) => handleCheckChange(event, nurse.id)}
                checked={checkedItems[nurse.id] || false}
              />
              <span>
                <BsCheck size={24} />
              </span>
            </S.CheckBox>
          </S.NurseContainer>
        </React.Fragment>
      ))}
    </S.NurseListContainer>
  );
}
