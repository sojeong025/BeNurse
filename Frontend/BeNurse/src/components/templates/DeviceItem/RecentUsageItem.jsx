import React, { useEffect, useState } from "react";
import { Common } from "../../../utils/global.styles";
import { customAxios } from "../../../libs/axios";

import nurse_g01 from "@assets/Images/nurse_g01.png";
import nurse_g02 from "@assets/Images/nurse_g02.png";
import nurse_g03 from "@assets/Images/nurse_g03.png";
import nurse_g04 from "@assets/Images/nurse_g04.png";

export default function RecentUsageItem({ log }) {
  const [nurse, setNurse] = useState(null);
  const [time, setTime] = useState(null);
  const [ward, setWard] = useState(null);

  useEffect(() => {
    customAxios.get("nurse?ID=" + log.nurseID).then((res) => {
      setNurse(res.data.responseData);
      customAxios.get("ward?ID=" + res.data.responseData.wardID).then((res) => {
        setWard(res.data.responseData);
      });
    });

    setTime(log.time.slice(11, 16));
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <p
        style={{
          fontSize: Common.fontSize.fontXXS,
          color: Common.color.purple04,
        }}
      >
        {time && time}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "220px",
        }}
      >
        <img
          style={{
            width: "50px",
            borderRadius: "40px",
            marginRight: "4px",
          }}
          src={
            nurse && nurse.grade === "평간호사"
              ? nurse_g01
              : nurse && nurse.grade === "주임 간호사"
              ? nurse_g02
              : nurse && nurse.grade === "책임 간호사"
              ? nurse_g03
              : nurse_g04
          }
          alt=""
        />
        <div
          style={{
            fontSize: Common.fontSize.fontXS,
            marginLeft: "12px",
          }}
        >
          <p
            style={{
              fontWeight: Common.fontWeight.extrabold,
              marginBottom: "4px",
            }}
          >
            {nurse && nurse.name} 간호사
          </p>
          <p>
            {nurse && nurse.wardName} {nurse && nurse.annual}년차
          </p>
        </div>
      </div>
      <p
        style={{
          fontSize: Common.fontSize.fontXS,
          fontWeight: Common.fontWeight.bold,
        }}
      >
        {log.patientName} 환자
      </p>
    </div>
  );
}
