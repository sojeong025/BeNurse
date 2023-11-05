import React from "react";
import { Common } from "../../../utils/global.styles";
import nurse from "@assets/Images/patient_temp.png";
import { ConfigProvider, Select } from "antd";

export default function EmployeeItem() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            fontSize: "12px",
            selectorBg: `${Common.color.purple03}`,
          },
        },
        token: {
          colorTextPlaceholder: `${Common.color.white02}`,
          colorIcon: `${Common.color.white02}`,
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "60px",
          border: "1px solid red",
          padding: "10px",
          boxSizing: "border-box",
          transition: "all 0.2s",
          fontSize: "14px",
        }}
      >
        <img
          style={{ width: "40px", borderRadius: "40px", marginRight: "4px" }}
          src={nurse}
          alt=""
        />
        <div>
          <p>김대웅</p>
          <p>970417</p>
        </div>
        <p>정형외과 5동</p>
        <Select
          style={{ width: "100px", fontSize: "14px" }}
          placeholder="직급"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={filterOption}
          options={[
            {
              value: "신규 간호사",
              label: "신규 간호사",
            },
            {
              value: "일반 간호사",
              label: "일반 간호사",
            },
            {
              value: "수간호사",
              label: "수간호사",
            },
            {
              value: "간호팀장",
              label: "간호팀장",
            },
            {
              value: "간호부장",
              label: "간호부장",
            },
          ]}
        />
      </div>
    </ConfigProvider>
  );
}
