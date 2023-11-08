import React from "react";
import { Common } from "../../../utils/global.styles";
import nurse from "@assets/Images/patient_temp.png";
import { ConfigProvider, Select } from "antd";

export default function EmployeeItem({ item }) {
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
        <p>{item.name}</p>
        <p>{item.annual}년차</p>
        <Select
          style={{ width: "80px", fontSize: "14px" }}
          placeholder="병동"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={filterOption}
          options={[
            {
              value: "내과",
              label: "내과",
            },
            {
              value: "외과",
              label: "외과",
            },
            {
              value: "신경과",
              label: "신경과",
            },
            {
              value: "순환기 내과",
              label: "순환기 내과",
            },
            {
              value: "성형외과",
              label: "성형외과",
            },
          ]}
        />
        <Select
          style={{ width: "80px", fontSize: "14px" }}
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
