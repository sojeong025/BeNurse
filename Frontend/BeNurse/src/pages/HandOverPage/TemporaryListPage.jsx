import React, { useEffect, useState, useRef } from "react";
import { customAxios } from "../../libs/axios";
import Box from "@components/atoms/Box/Box";
import * as S from "@components/templates/HandOver/HandOverList.styles.jsx";
import HandOverItem from "@assets/Icons/handoveritem.svg";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";

import { Common } from "@utils/global.styles";
import { NavLink } from "react-router-dom";
import { useHandoverSetStore } from "../../store/store";
import { usePatientCardStore } from "../../store/store";

import empty from "@assets/Images/empty.png";

export default function TemporaryListPage() {
  const [tempHandoverInfo, setTempHandoverInfo] = useState([]);
  const [sendHandoversetId, setSendHandoversetId] = useState();
  const { setHandoverSetId } = useHandoverSetStore((state) => state);
  const { unsetCompletedHandover } = usePatientCardStore((state) => state);

  useEffect(() => {
    customAxios.get("HandoverSet/tempsave").then((res) => {
      setTempHandoverInfo(res.data.responseData);
    });
    unsetCompletedHandover();
  }, []);

  return (
    <div
      style={{
        height: "820px",
        width: "calc(100% - 28px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "122px",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            marginLeft: "14px",
            fontSize: Common.fontSize.fontS,
            color: "#333",
          }}
        >
          📝 임시저장 인계장은 매일 오후 한시에 초기화됩니다.
        </p>
      </div>
      <div
        style={{
          height: "688px",
          overflow: "scroll",
          width: "calc(100% - 28px)",
          margin: "0 auto",
        }}
      >
        {tempHandoverInfo.length > 0 ? (
          tempHandoverInfo.map((tempHandover, index) => (
            <NavLink
              to="/handover-write"
              onClick={() => {
                localStorage.setItem("isTemporary", "temp");
                setHandoverSetId(tempHandover.handoverSetID);
              }}
            >
              <React.Fragment>
                <Box
                  type={"transparent"}
                  size={["100%", "80px"]}
                  flex={["space-between", "center"]}
                  props={
                    "z-index: 1; transform: translateX(0px); background-color: #fff;"
                  }
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
                          {tempHandover.giveWorkTime === "D"
                            ? "데이"
                            : tempHandover.giveWorkTime === "E"
                            ? "이브닝"
                            : "나이트"}
                          &nbsp;타임 인계장
                        </p>
                      </S.HandOverItemLeft>
                    </div>
                  </S.HandOverItem>
                  <div style={{ fontSize: Common.fontSize.fontXXS }}>
                    {formatDateWithDay(tempHandover.updatedAt)}
                  </div>
                </Box>
                {/* <div
              style={{
                width: "80px",
                height: "80px",
                position: "absolute",
                backgroundColor: "red",
                right: "20px",
                zIndex: -1,
              }}
            ></div> */}
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
            <p>등록된 기록이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
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
