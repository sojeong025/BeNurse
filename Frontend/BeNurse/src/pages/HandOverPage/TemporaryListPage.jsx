import React, { useEffect, useState } from "react";
import { customAxios } from "../../libs/axios";
import Box from "@components/atoms/Box/Box";
import * as S from "@components/templates/HandOver/HandOverList.styles.jsx";
import HandOverItem from "@assets/Icons/handoveritem.svg";

import { Common } from "@utils/global.styles";
import { NavLink } from "react-router-dom";
import { useHandoverSetStore } from "../../store/store";

export default function TemporaryListPage() {
  const [tempHandoverInfo, setTempHandoverInfo] = useState([]);
  const [sendHandoversetId, setSendHandoversetId] = useState();
  const { setHandoverSetId } = useHandoverSetStore((state) => state);

  useEffect(() => {
    customAxios.get("HandoverSet/tempsave").then((res) => {
      console.log(res.data.responseData);
      setTempHandoverInfo(res.data.responseData);
    });
  }, []);

  return (
    <div
      style={{
        height: "820px",
        overflow: "scroll",
        width: "calc(100% - 28px)",
        margin: "0 auto",
      }}
    >
      {tempHandoverInfo.map((tempHandover, index) => (
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
            </Box>
          </React.Fragment>
        </NavLink>
      ))}
    </div>
  );
}
