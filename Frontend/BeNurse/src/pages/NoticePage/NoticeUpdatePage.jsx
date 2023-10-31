import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";

import * as S from "./NoticePage.styles";

export default function NoticeUpdatePage() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const onClickUploadBtn = () => {
    navigate("/notice");
  };
  return (
    <>
      <Container>
        <S.WriteContainer>
          <S.WriteTitleInput
            type="text"
            placeholder={noticeId + "번 공지 제목"}
          />
          <S.WriteContentInput placeholder={noticeId + "번 공지 내용"} />
          <Button
            variant="primary"
            onClick={onClickUploadBtn}
          >
            등록하기
          </Button>
        </S.WriteContainer>
      </Container>
    </>
  );
}
