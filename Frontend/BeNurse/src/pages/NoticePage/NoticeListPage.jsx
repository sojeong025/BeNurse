import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/atoms/Container/Container";
import BottomSelectPanel from "../../components/templates/BottomSelectPanel/BottomSelectPanel";
import CreatePencilButton from "../../components/atoms/Button/CreatePencilButton";

import { customAxios } from "../../libs/axios";
import moment from "moment";
import LongPressable from "react-longpressable";

import * as S from "./NoticePage.styles";

import { BsFillPersonFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useBottomSheetStore } from "../../store/store";

export default function NoticeListPage() {
  const [noticeList, setNoticeList] = useState([]);
  const [activeNotices, setActiveNotices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    customAxios
      .get("nurse/me")
      .then((res) => {
        setIsAdmin(res.data.responseData.admin);
      })
      .catch((error) => {
        console.error("admin 여부 확인 실패:", error);
      });
    customAxios
      .get("notice/all")
      .then((res) => {
        console.log("공지 사항 목록 불러오기", res.data.responseData);
        setNoticeList(res.data.responseData);
      })
      .catch((error) => {
        console.error("공지사항 목록 로드 실패:", error);
      });
  }, []);

  const { ActivateEdit } = useBottomSheetStore((state) => state);

  const handleNoticeClick = (id) => {
    if (activeNotices.includes(id)) {
      setActiveNotices(activeNotices.filter((noticeId) => noticeId !== id));
    } else {
      setActiveNotices([...activeNotices, id]);
    }
  };

  const onLongPress = (e, key) => {
    ActivateEdit(`${key}/update`, "delete");
  };

  return (
    <Container>
      <S.MainContainer>
        {noticeList.map((notice, i) => (
          <LongPressable
            onLongPress={(e) => onLongPress(e, notice.id)}
            onShortPress={() => {}}
            longPressTime={400}
            key={i}
          >
            <S.NoticeLable onClick={() => handleNoticeClick(notice.id)}>
              <div
                className={`notice ${
                  activeNotices.includes(notice.id) ? "active" : ""
                }`}
              >
                <div className="notice_header">
                  <p className="notice_title">[공지] {notice.title}</p>
                  <MdKeyboardArrowRight className="arrow_icon" />
                </div>

                <div
                  className={`notice_bottom ${
                    activeNotices.includes(notice.id) ? "active" : ""
                  }`}
                >
                  <div className="notice_content">{notice.content}</div>
                  <div className="notice_info">
                    <p className="notice_date">
                      {moment(Date(notice.time)).format("YY/MM/DD hh:mm")}
                    </p>
                    <div>
                      <p className="notice_writer">
                        {notice.writerName} 간호사
                      </p>
                      <BsFillPersonFill />
                    </div>
                  </div>
                </div>
              </div>
            </S.NoticeLable>
          </LongPressable>
        ))}

        {isAdmin && (
          <Link
            to="write"
            style={{
              position: "absolute",
              right: "14px",
              bottom: "80px",
              zIndex: 1,
            }}
          >
            <CreatePencilButton />
          </Link>
        )}
      </S.MainContainer>
      <BottomSelectPanel
        modifyLabel={"수정하기"}
        deleteLabel={"삭제하기"}
      />
    </Container>
  );
}
