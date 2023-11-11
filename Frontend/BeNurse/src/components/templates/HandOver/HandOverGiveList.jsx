import React, { useEffect, useState } from "react";
import { customAxios } from "../../../libs/axios";
import Box from "../../atoms/Box/Box";
import * as S from "./HandOverList.styles";
import HandOverItem from "@assets/Icons/handoveritem.svg";
import nurse from "@assets/Images/patient_temp.png";

import { Common } from "../../../utils/global.styles";

export default function HandOverGiveList() {
  const [giveHandoverInfo, setGiveHandoverInfo] = useState([]);
  const [giveHandoversetId, setGiveHandoversetId] = useState();

  useEffect(() => {
    customAxios
      .get("myhandover/all")
      .then((res) => {
        console.log("내가 받은 인계장 조회", res);
        setGiveHandoverInfo(res.data.responseData);
        setGiveHandoversetId(res.data.responseData.handoverSetID);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <S.HandOverContainer>
      {giveHandoverInfo.map((givehandover, index) => (
        <React.Fragment key={index}>
          <Box
            type={"transparent"}
            size={["100%", "80px"]}
            flex={["space-between", "center"]}
            border={true}
          >
            <S.HandOverItem>
              <img
                src={HandOverItem}
                style={{ width: "28px" }}
                alt=""
              />
              <S.HandOverItemLeft>
                <p className="handoverTitle">
                  {givehandover.giveWorkTime === "D"
                    ? "데이"
                    : givehandover.giveWorkTime === "E"
                    ? "이브닝"
                    : "나이트"}
                  &nbsp;타임 인계장
                </p>
                <p className="handoverNurseName">
                  from. {givehandover.giveName} 간호사
                </p>
              </S.HandOverItemLeft>
            </S.HandOverItem>
            <div>
              <p
                style={{
                  fontSize: Common.fontSize.fontXXS,
                  marginBottom: "0px",
                }}
              >
                {formatDateWithDay(givehandover.time)}
                <p
                  style={{
                    textAlign: "end",
                    marginTop: "10px",
                    color: Common.color.purple04,
                  }}
                >
                  읽지않음
                </p>
              </p>
            </div>
          </Box>
        </React.Fragment>
      ))}
    </S.HandOverContainer>
  );
}

function formatDateWithDay(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  };
  return new Intl.DateTimeFormat("ko-KR", options)
    .format(date)
    .replace(/(\d{4}).(\d{2}).(\d{2}).\s*(\w{3})/, "$1.$2.$3($4)");
}
