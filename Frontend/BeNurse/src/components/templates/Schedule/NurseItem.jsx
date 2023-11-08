import React, { useEffect, useState } from "react";
import Box from "../../atoms/Box/Box";
import { Common } from "../../../utils/global.styles";
import nurseimg from "@assets/Images/patient_temp.png";
import { customAxios } from "../../../libs/axios";

export default function NurseItem({ nurse }) {
  const [wards, setWards] = useState();

  useEffect(() => {
    customAxios.get("ward/all").then((res) => {
      setWards(res.data.responseData);
    });
  }, []);

  const ward = wards?.filter((ward) => ward.id === nurse.wardID);

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
          <img
            style={{
              height: "48px",
              borderRadius: "50px",
              border: "1px solid gray",
            }}
            src={nurseimg}
            alt=""
          />
          {ward && (
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
                {ward[0].name}
                {nurse.annual}년 차
              </p>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
}
