import React, { useEffect, useState } from "react";

import { BsCheck } from "react-icons/bs";
import nurse_g01 from "@assets/Images/nurse_g01.png";
import nurse_g02 from "@assets/Images/nurse_g02.png";
import nurse_g03 from "@assets/Images/nurse_g03.png";
import nurse_g04 from "@assets/Images/nurse_g04.png";
import { customAxios } from "../../../libs/axios";

import * as S from "./HandOverNurseSelectItem.styles";

export default function HandOverNurseSelectItem({
  onSelectChange,
  searchNurse,
}) {
  const [sendNurseInfo, setSendNurseInfo] = useState([]);
  const [myId, setMyId] = useState();
  const [wardId, setWardId] = useState();
  const [wardName, setWardName] = useState();
  const [checkedItems, setCheckedItems] = useState({});

  const filteredNurses = sendNurseInfo.filter((nurse) =>
    nurse.name.includes(searchNurse),
  );

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
      {filteredNurses.map((nurse, index) => (
        <React.Fragment key={index}>
          <S.NurseContainer>
            <S.NurseProfile>
              <img
                style={{
                  width: "40px",
                  borderRadius: "40px",
                  marginRight: "4px",
                }}
                src={
                  nurse.grade === "평간호사"
                    ? nurse_g01
                    : nurse.grade === "주임 간호사"
                    ? nurse_g02
                    : nurse.grade === "책임 간호사"
                    ? nurse_g03
                    : nurse_g04
                }
                alt=""
              />
              <div>
                <p className="nurse_name">{nurse.name} 간호사</p>
                <p className="nurse_work">
                  {nurse.wardName} {nurse.annual}년 차
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
