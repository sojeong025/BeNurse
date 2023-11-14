import React, { useState, useEffect } from "react";
import { Common } from "../../../utils/global.styles";
import nurse_g01 from "@assets/Images/nurse_g01.png";
import nurse_g02 from "@assets/Images/nurse_g02.png";
import nurse_g03 from "@assets/Images/nurse_g03.png";
import nurse_g04 from "@assets/Images/nurse_g04.png";
import { ConfigProvider, Select } from "antd";

import * as S from "./EmployeeItem.styles";

export default function EmployeeItem({ item, wards, edit, nurses, setNurses }) {
  const onChangeWard = (value, option) => {
    setNurses(
      nurses.map((nurse) =>
        nurse.id === item.id
          ? { ...nurse, wardID: value, wardName: option.label }
          : nurse,
      ),
    );
  };

  const onChangeGrade = (value) => {
    setNurses(
      nurses.map((nurse) =>
        nurse.id === item.id ? { ...nurse, grade: value } : nurse,
      ),
    );
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            fontSize: "12px",
            selectorBg: `${Common.color.purple02}`,
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
          padding: "10px",
          boxSizing: "border-box",
          transition: "all 0.2s",
          fontSize: "14px",
          borderBottom: "1px solid #cccccc",
        }}
      >
        <img
          style={{ width: "40px", borderRadius: "40px", marginRight: "4px" }}
          src={
            item.grade === "평간호사"
              ? nurse_g01
              : item.grade === "주임 간호사"
              ? nurse_g02
              : item.grade === "책임 간호사"
              ? nurse_g03
              : nurse_g04
          }
          alt=""
        />
        <div
          style={{
            width: "120px",
            display: "flex",
            margin: "0 10px",
            justifyContent: "space-evenly",
          }}
        >
          <p style={{ fontWeight: "bold" }}>{item.name}</p>
          <p style={{ fontSize: "12px" }}>{item.annual}년차</p>
        </div>
        {edit == "간호사 관리" ? (
          <S.SelectContainer style={{ display: "flex", gap: "3px" }}>
            <Select
              style={{ width: "90px", fontSize: "14px" }}
              placeholder="병동"
              optionFilterProp="children"
              onChange={onChangeWard}
              filterOption={filterOption}
              value={
                item.wardID
                  ? wards.find((ward) => ward.id === item.wardID).name
                  : undefined
              }
              options={wards.map((ward) => {
                return { value: ward.id, label: ward.name };
              })}
            />
            <Select
              style={{ width: "90px", fontSize: "14px" }}
              placeholder="직급"
              optionFilterProp="children"
              onChange={onChangeGrade}
              filterOption={filterOption}
              value={item.grade ? item.grade : undefined}
              options={[
                {
                  value: "평간호사",
                  label: "평간호사",
                },
                {
                  value: "주임 간호사",
                  label: "주임 간호사",
                },
                {
                  value: "책임 간호사",
                  label: "책임 간호사",
                },
                {
                  value: "수간호사",
                  label: "수간호사",
                },
              ]}
            />
          </S.SelectContainer>
        ) : (
          <div
            style={{
              width: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              fontSize: "12px",
              color: "#555555",
              fontWeight: "bold",
            }}
          >
            <p style={{ width: "90px" }}>{item.wardName}</p>
            <p style={{ width: "90px" }}>{item.grade}</p>
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}
