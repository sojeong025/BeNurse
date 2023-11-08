import React, { useEffect, useState } from "react";
import { Common } from "../../../utils/global.styles";
import { customAxios } from "../../../libs/axios";

import nurseImg from "@assets/Images/patient_temp.png";

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
            height: "48px",
            border: "1px solid gray",
            borderRadius: "50px",
          }}
          src={nurseImg}
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
            {ward && ward.name} {nurse && nurse.annual}년차
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
