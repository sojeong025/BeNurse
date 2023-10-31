import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/atoms/Container/Container";
import BottomSelectPanel from "../../components/templates/BottomSelectPanel/BottomSelectPanel";
import CreatePencilButton from "../../components/atoms/Button/CreatePencilButton";

import LongPressable from "react-longpressable";

import * as S from "./NoticePage.styles";

import { BsFillPersonFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useBottomSheetStore } from "../../store/store";

export default function NoticeListPage() {
  const { ActivateEdit } = useBottomSheetStore((state) => state);
  const handleNoticeClick = (key) => {
    const selectedNotice = document.querySelectorAll(".notice")[key - 1];
    if (selectedNotice.classList.contains("active")) {
      selectedNotice.classList.remove("active");
    } else {
      selectedNotice.classList.add("active");
    }
  };

  const onLongPress = (e, key) => {
    ActivateEdit(`${key}/update`, "delete");
  };

  return (
    <Container>
      <S.MainContainer>
        <LongPressable
          onLongPress={(e) => onLongPress(e, 1)}
          onShortPress={() => {}}
          longPressTime={400}
        >
          <S.NoticeLable onClick={() => handleNoticeClick(1)}>
            <div className="notice">
              <div className="notice_header">
                <p className="notice_title">
                  [공지] 코로나19 예방을 위한 접종 안내
                </p>
                <MdKeyboardArrowRight className="arrow_icon" />
              </div>

              <div className="notice_bottom">
                <div className="notice_content">
                  다가오는 응급처치 교육에 대한 신청이 시작되었습니다. 교육
                  일정과 신청 방법에 대한 자세한 내용은 회사 홈페이지에서
                  확인해주세요. 😄😄
                </div>
                <div className="notice_info">
                  <p className="notice_date">2023.10.18</p>
                  <div>
                    <p className="notice_writer">1병동 2병실 김간호사</p>
                    <BsFillPersonFill />
                  </div>
                </div>
              </div>
            </div>
          </S.NoticeLable>
        </LongPressable>
        <LongPressable
          onLongPress={(e) => onLongPress(e, 2)}
          onShortPress={() => {}}
          longPressTime={400}
        >
          {" "}
          <S.NoticeLable onClick={() => handleNoticeClick(2)}>
            <div className="notice">
              <div className="notice_header">
                <p className="notice_title">
                  [공지] 코로나19 예방을 위한 접종 안내
                </p>
                <MdKeyboardArrowRight className="arrow_icon" />
              </div>

              <div className="notice_bottom">
                <div className="notice_content">
                  아무튼 엄청 긴 문장입니다.아무튼 엄청 긴 문장입니다.아무튼
                  엄청 긴 문장입니다.아무튼 엄청 긴 문장입니다.아무튼 엄청 긴
                  문장입니다.아무튼 엄청 긴 문장입니다.아무튼 엄청 긴
                  문장입니다.아무튼 엄청 긴 문장입니다.아무튼 엄청 긴
                  문장입니다.아무튼 엄청 긴 문장입니다.아무튼 엄청 긴
                  문장입니다.아무튼 엄청 긴 문장입니다.아무튼 엄청 긴
                  문장입니다.아무튼 엄청 긴 문장입니다.아무튼 엄청 긴
                  문장입니다.아무튼 엄청 긴 문장입니다.아무튼 엄청 긴
                  문장입니다.아무튼 엄청 긴 문장입니다.아무튼 엄청 긴
                  문장입니다.아무튼 엄청 긴 문장입니다.아무튼 엄청 긴
                  문장입니다.아무튼 엄청 긴 문장입니다.
                </div>
                <div className="notice_info">
                  <p className="notice_date">2023.10.18</p>
                  <div>
                    <p className="notice_writer">1병동 2병실 김간호사</p>
                    <BsFillPersonFill />
                  </div>
                </div>
              </div>
            </div>
          </S.NoticeLable>
        </LongPressable>
        <LongPressable
          onLongPress={(e) => onLongPress(e, 3)}
          onShortPress={() => {}}
          longPressTime={400}
        >
          <S.NoticeLable onClick={() => handleNoticeClick(3)}>
            <div className="notice">
              <div className="notice_header">
                <p className="notice_title">
                  [공지] 코로나19 예방을 위한 접종 안내
                </p>
                <MdKeyboardArrowRight className="arrow_icon" />
              </div>

              <div className="notice_bottom">
                <div className="notice_content">멍멍</div>
                <div className="notice_info">
                  <p className="notice_date">2023.10.18</p>
                  <div>
                    <p className="notice_writer">1병동 2병실 김간호사</p>
                    <BsFillPersonFill />
                  </div>
                </div>
              </div>
            </div>
          </S.NoticeLable>
        </LongPressable>
        <Link to="write"
          style={{
            position: "absolute",
            right: "14px",
            bottom: "80px",
            zIndex: 1,
          }}
        >
          <CreatePencilButton />
        </Link>
      </S.MainContainer>
      <BottomSelectPanel
        modifyLabel={"공지 수정"}
        deleteLabel={"공지 삭제"}
      />
    </Container>
  );
}
