import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { customAxios } from "../../libs/axios";

import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import * as S from "./NoticePage.styles";

import toast, { Toaster } from "react-hot-toast";

export default function NoticeUpdatePage() {
  const { noticeId } = useParams();
  const [noticeData, setNoticeData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    customAxios
      .get("notice?ID=" + noticeId)
      .then((res) => {
        setNoticeData(res.data.responseData);
      })
      .catch((error) => {
        console.error("공지사항 로드 실패:", error);
      });
  }, []);

  const onClickUploadBtn = () => {
    if (!noticeData.title) {
      toast("제목을 작성해주세요.", {
        position: "bottom-center",
        icon: "⚠️",
        duration: 1500,
        style: {
          fontSize: "14px",
          borderRadius: "40px",
          background: "#000000d1",
          color: "#fff",
        },
      });
      return;
    }
    if (!noticeData.content) {
      toast("내용을 작성해주세요.", {
        position: "bottom-center",
        icon: "⚠️",
        duration: 1500,
        style: {
          fontSize: "14px",
          borderRadius: "40px",
          background: "#000000d1",
          color: "#fff",
        },
      });
      return;
    }
    customAxios
      .put("notice", noticeData)
      .then((res) => {
        navigate("/notice");
      })
      .catch((error) => {
        console.error("공지사항 수정 실패:", error);
      });
  };

  return (
    <>
      <Container>
        <Toaster />
        <S.WriteContainer>
          <S.WriteTitleInput
            type="text"
            placeholder={"공지사항 제목을 입력해주세요."}
            value={noticeData.title}
            onChange={(e) => {
              setNoticeData({ ...noticeData, title: e.target.value });
            }}
          />
          <S.WriteContentInput
            placeholder={"공지사항 내용을 입력해주세요."}
            value={noticeData.content}
            onChange={(e) => {
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
