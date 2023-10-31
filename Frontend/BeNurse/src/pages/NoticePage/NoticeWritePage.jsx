import React from "react";
import { useNavigate } from "react-router";
import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";

import * as S from "./NoticePage.styles";

export default function NoticeWritePage() {
  const navigate = useNavigate();
  const onClickUploadBtn = () => {
    navigate("/notice");
  };
  return (
    <Container>
      <S.WriteContainer>
        <S.WriteTitleInput
          type="text"
          placeholder="공지사항 제목을 입력해주세요."
        />
        <S.WriteContentInput placeholder="공지사항 내용을 입력해주세요." />
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
