import React, { useEffect, useState } from "react";
import Box from "../../atoms/Box/Box";
import { Common } from "../../../utils/global.styles";
import nurse_g01 from "@assets/Images/nurse_g01.png";
import nurse_g02 from "@assets/Images/nurse_g02.png";
import nurse_g03 from "@assets/Images/nurse_g03.png";
import nurse_g04 from "@assets/Images/nurse_g04.png";
import { customAxios } from "../../../libs/axios";

export default function NurseItem({ nurse }) {
  const [nurseDetail, setNurseDetail] = useState();

  useEffect(() => {
    customAxios.get("nurse?ID=" + nurse.nurseID).then((res) => {
      setNurseDetail(res.data.responseData);
    });
  }, []);

  return (
    <Box
      type={"white"}
      size={["100%", "90px"]}
      flex={["flex-start", "center"]}
    >
      <div
        style={{
          width: "20px",
          height: "100%",
          backgroundColor:
            nurse.worktime === "D"
              ? Common.color.day
              : nurse.worktime === "E"
              ? Common.color.evening
              : Common.color.night,
          borderRadius: "16px 0px 0px 16px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          width: "100%",
          padding: "10px 20px",
          color: Common.color.black03,
          fontSize: Common.fontSize.fontS,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {nurseDetail && (
            <>
              <img
                style={{
                  width: "50px",
                  borderRadius: "40px",
                  marginRight: "4px",
                }}
                src={
                  nurseDetail.grade === "평간호사"
                    ? nurse_g01
                    : nurseDetail.grade === "주임 간호사"
                    ? nurse_g02
                    : nurseDetail.grade === "책임 간호사"
                    ? nurse_g03
                    : nurse_g04
                }
                alt=""
              />
              <div>
                <p
                  style={{
                    fontWeight: Common.fontWeight.extrabold,
                    marginBottom: "6px",
                  }}
                >
                  {nurse.name}
                </p>
                <p
                  style={{
                    fontWeight: Common.fontWeight.bold,
                    fontSize: Common.fontSize.fontXXS,
                  }}
                >
                  {nurseDetail.wardName + " "}
                  {nurse.annual}년 차
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </Box>
  );
}
