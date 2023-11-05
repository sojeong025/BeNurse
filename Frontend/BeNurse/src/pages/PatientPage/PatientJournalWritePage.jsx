import React from "react";

import { Common } from "@utils/global.styles.jsx";

import * as S from "./PatientJournalWritePage.styles";
import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import PatientDetailProfile from "../../components/templates/Patient/PatientDetailProfile";

import { ConfigProvider, Select } from "antd";

export default function PatientJournalWritePage() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Container>
      <div
        style={{
          margin: "80px auto 0 auto",
          width: "calc(100% - 28px)",
        }}
      >
        <PatientDetailProfile />
        <S.WriteContainer>
          <S.WriteTypeSelect>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    selectorBg: `${Common.color.purple00}`,
                  },
                },
                token: {
                  fontFamily: "NanumSquareNeo",
                  colorTextPlaceholder: `${Common.color.black01}`,
                },
              }}
            >
              <Select
                placeholder="과명"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={filterOption}
                size="large"
                options={[
                  {
                    value: "활력징후",
                    label: "활력징후",
                  },
                  {
                    value: "검사 전후 간호",
                    label: "검사 전후 간호",
                  },
                  {
                    value: "수술 전후 간호",
                    label: "수술 전후 간호",
                  },
                  {
                    value: "환자 상태",
                    label: "환자 상태",
                  },
                  {
                    value: "교육",
                    label: "교육",
                  },
                  {
                    value: "투약 및 수액",
                    label: "투약 및 수액",
                  },
                ]}
              />
            </ConfigProvider>
          </S.WriteTypeSelect>

          <S.WriteContentInput
            placeholder={"간호 수행 내용을 입력해주세요."}
            // value={noticeData.content}
            onChange={(e) => {
              console.log(e);
              // setNoticeData({ ...noticeData, content: e.target.value });
            }}
          />
          <Button
            variant="primary"
            onClick={
              () => console.log("hi")
              // onClickUploadBtn(noticeData.title, noticeData.content)
            }
          >
            등록하기
          </Button>
        </S.WriteContainer>
      </div>
    </Container>
  );
}
