import React, { useEffect, useState } from "react";

import { Common } from "@utils/global.styles.jsx";
import { useParams } from "react-router-dom";

import { customAxios } from "../../libs/axios";

import * as S from "./PatientJournalWritePage.styles";
import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import PatientDetailProfile from "../../components/templates/Patient/PatientDetailProfile";

import { ConfigProvider, Select } from "antd";

export default function PatientJournalWritePage() {
  const [journal, setJournal] = useState({});

  const [patient, setPatient] = useState({
    id: "",
    age: "",
    discharge: "",
    disease: "",
    drinking: "",
    gender: "",
    hospitalization: "",
    surgery: "",
    history: "",
    medicine: "",
    name: "",
    selfmedicine: "",
    smoking: "",
    alergy: "",
    surgery: "",
    cc: [],
  });
  const { patientId } = useParams();

  useEffect(() => {
    customAxios
      .get("emr/patient?id=" + patientId)
      .then((res) => {
        console.log("환자 정보 불러오기", res.data.responseData);
        setPatient({
          ...res.data.responseData.patient,
          cc: res.data.responseData.cc,
        });
      })
      .catch((error) => {
        console.error("환자 정보 로드 실패:", error);
      });
  }, []);

  const onChange = (value) => {
    setJournal({ ...journal, category: value });
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
        <PatientDetailProfile patient={patient} />
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
            value={journal.content}
            onChange={(e) => {
              setJournal({ ...journal, content: e.target.value });
            }}
          />
          <Button
            variant="primary"
            onClick={() => {
              customAxios
                .post("emr/journal", {
                  category: journal.category,
                  content: journal.content,
                  datetime: new Date().toISOString(),
                  id: 0,
                  patientID: patientId,
                  writerID: 2, //TODO - 현재 로그인한 간호사 id 가져오는 걸로 바꿔주기
                })
                .then((res) => {
                  console.log("간호 일지 작성 성공", res);
                })
                .catch((error) => {
                  console.error("환자 정보 로드 실패:", error);
                });
            }}
          >
            등록하기
          </Button>
        </S.WriteContainer>
      </div>
    </Container>
  );
}
