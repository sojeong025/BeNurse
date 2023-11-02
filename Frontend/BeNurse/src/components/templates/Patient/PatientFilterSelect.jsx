import React from "react";
import { ConfigProvider, Select } from "antd";

import { Common } from "@utils/global.styles.jsx";

import * as S from "./PatientFilterSelect.styles";

export default function PatientFilterSelect() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            selectorBg: `${Common.color.purple03}`,
          },
        },
        token: {
          colorTextPlaceholder: `${Common.color.white02}`,
          colorIcon: `${Common.color.white02}`,
        },
      }}
    >
      <S.SelectContainer>
        <Select
          showSearch
          placeholder="과명"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          size="large"
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
              value: "기타",
              label: "기타",
            },
          ]}
        />
        <Select
          showSearch
          placeholder="병동"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          size="large"
          options={[
            {
              value: "1동",
              label: "1동",
            },
            {
              value: "2동",
              label: "2동",
            },
            {
              value: "3동",
              label: "3동",
            },
          ]}
        />
        <Select
          showSearch
          placeholder="호실"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          size="large"
          options={[
            {
              value: "B301",
              label: "B301",
            },
            {
              value: "B302",
              label: "B302",
            },
            {
              value: "B303",
              label: "B303",
            },
          ]}
        />
      </S.SelectContainer>
    </ConfigProvider>
  );
}
