import React, { useState } from "react";
import { useNavigate } from "react-router";
import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";

import * as S from "./NoticePage.styles";

import { customAxios } from "../../libs/axios";
import toast, { Toaster } from "react-hot-toast";

export default function NoticeWritePage() {
  const navigate = useNavigate();
  const [noticeContent, setNoticeContent] = useState({});
  const onClickUploadBtn = () => {
    if (!noticeContent.title) {
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
    if (!noticeContent.content) {
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
      .post("notice", {
        title: noticeContent.title,
        content: noticeContent.content,
      })
      .then((res) => {
        navigate("/notice");
      })
      .catch((error) => {
        console.error("공지사항 작성 실패:", error);
      });
  };
  return (
    <Container>
      <Toaster />
      <S.WriteContainer>
        <S.WriteTitleInput
          autoFocus={true}
          type="text"
          placeholder="공지사항 제목을 입력해주세요."
          onChange={(e) => {
            setNoticeContent({ ...noticeContent, title: e.target.value });
          }}
        />
        <S.WriteContentInput
          placeholder="공지사항 내용을 입력해주세요."
          onChange={(e) => {
            setNoticeContent({ ...noticeContent, content: e.target.value });
          }}
        />
        <Button
          variant="primary"
          onClick={onClickUploadBtn}
        >
          등록하기
        </Button>
      </S.WriteContainer>
    </Container>
  );
}
