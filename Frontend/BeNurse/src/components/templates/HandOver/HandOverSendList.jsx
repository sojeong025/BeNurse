import React, { useEffect, useState } from "react";
import { customAxios } from "../../../libs/axios";
import Box from "../../atoms/Box/Box";
import * as S from "./HandOverList.styles";
import HandOverItem from "@assets/Icons/handoveritem.svg";

import { Common } from "../../../utils/global.styles";
import { NavLink } from "react-router-dom";

export default function HandOverSendList() {
  const [sendHandoverInfo, setSendHandoverInfo] = useState([]);
  const [sendHandoversetId, setSendHandoversetId] = useState();

  useEffect(() => {
    customAxios
      .get("myhandover/send")
      .then((res) => {
        console.log("내가 보낸 인계장 조회", res);
        setSendHandoverInfo(res.data.responseData);
        setSendHandoversetId(res.data.responseData.handoverSetID);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <S.HandOverContainer>
      {sendHandoverInfo.map((sendhandover, index) => (
        <NavLink
          to={`/handover-read/${sendhandover.handoverSetID}`}
          key={index}
        >
          <React.Fragment>
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
                <div>
                  <S.HandOverItemLeft>
                    <p className="handoverTitle">
                      {sendhandover.giveWorkTime === "D"
                        ? "데이"
                        : sendhandover.giveWorkTime === "E"
                        ? "이브닝"
                        : "나이트"}
                      &nbsp;타임 인계장
                    </p>
                    <p className="handoverNurseName">
                      to.{" "}
                      {sendhandover.takeNames
                        .map((name) => `${name} 간호사`)
                        .join(" ")}
                    </p>
                  </S.HandOverItemLeft>
                </div>
              </S.HandOverItem>
              <div
                style={{
                  fontSize: Common.fontSize.fontXXS,
                  marginBottom: "27px",
                }}
              >
                {formatDateWithDay(sendhandover.time)}
              </div>
            </Box>
          </React.Fragment>
        </NavLink>
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
