import React, { useEffect, useState } from "react";
import { customAxios } from "../../../libs/axios";
import Box from "../../atoms/Box/Box";
import * as S from "./HandOverList.styles";
import HandOverItem from "@assets/Icons/handoveritem.svg";
import { NavLink } from "react-router-dom";

import { Common } from "../../../utils/global.styles";
import empty from "@assets/Images/empty.png";

export default function HandOverGiveList({ maxItems }) {
  const [giveHandoverInfo, setGiveHandoverInfo] = useState([]);
  const [giveHandoversetId, setGiveHandoversetId] = useState();

  const itemsToRender = maxItems
    ? giveHandoverInfo.slice(0, maxItems)
    : giveHandoverInfo;

  useEffect(() => {
    customAxios
      .get("myhandover/all")
      .then((res) => {
        setGiveHandoverInfo(res.data.responseData);
        setGiveHandoversetId(res.data.responseData.handoverSetID);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <S.HandOverContainer>
      {itemsToRender.length > 0 ? (
        itemsToRender.map((givehandover, index) => (
          <NavLink
            to={`/handover-read/${givehandover.handoverSetID}`}
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
                <div
                  style={{
                    fontSize: Common.fontSize.fontXXS,
                    marginBottom: "26px",
                  }}
                >
                  {formatDateWithDay(givehandover.time)}
                </div>
              </Box>
            </React.Fragment>
          </NavLink>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            opacity: "0.5",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={empty}
            alt=""
            width="150px"
            height="150px"
          />
          <p>받은 인계장이 없습니다.</p>
        </div>
      )}
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
