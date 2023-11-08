import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { customAxios } from "../../libs/axios";

import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import axios from "axios";
import * as S from "./NoticePage.styles";

export default function NoticeUpdatePage() {
  const { noticeId } = useParams();
  const [noticeData, setNoticeData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log(noticeId);
    customAxios
      .get("benurse/notice", { params: { ID: noticeId } })
      .then((res) => {
        console.log("공지 사항 불러오기", res.data.responseData);
        setNoticeData(res.data.responseData);
      })
      .catch((error) => {
        console.error("공지사항 로드 실패:", error);
      });
  }, []);

  const onClickUploadBtn = (title, content) => {
    axios({
      url: `http://k9e105.p.ssafy.io:9001/api/benurse/notice/{id}?ID=${noticeId}`,
      method: "put",
      body: noticeData,
    })
      .then((res) => {
        console.log("공지 사항 불러오기", res.data.responseData);
        setNoticeData(res.data.responseData);
      })
      .catch((error) => {
        console.error("공지사항 로드 실패:", error);
      });
    navigate("/notice");
  };
  
  return (
    <>
      <Container>
        <S.WriteContainer>
          <S.WriteTitleInput
            type="text"
            placeholder={"공지사항 제목을 입력해주세요."}
            value={noticeData.title}
            onChange={(e) => {
              console.log(e);
              setNoticeData({ ...noticeData, title: e.target.value });
            }}
          />
          <S.WriteContentInput
            placeholder={"공지사항 내용을 입력해주세요."}
            value={noticeData.content}
            onChange={(e) => {
              console.log(e);
              setNoticeData({ ...noticeData, content: e.target.value });
            }}
          />
          <Button
            variant="primary"
            onClick={() =>
              onClickUploadBtn(noticeData.title, noticeData.content)
            }
          >
            수정하기
          </Button>
        </S.WriteContainer>
      </Container>
    </>
  );
}
