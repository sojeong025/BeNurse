import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/atoms/Container/Container";
import BottomSelectPanel from "../../components/templates/BottomSelectPanel/BottomSelectPanel";
import CreatePencilButton from "../../components/atoms/Button/CreatePencilButton";

import { customAxios } from "../../libs/axios";
import moment from "moment";
import LongPressable from "react-longpressable";

import Button from "@components/atoms/Button/Button";
import Modal from "@components/atoms/Modal/Modal";

import * as S from "./NoticePage.styles";

import { BsFillPersonFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useBottomSheetStore } from "../../store/store";
import trashcan from "@assets/Images/trashcan.png";

export default function NoticeListPage() {
  const navigate = useNavigate();

  const [noticeList, setNoticeList] = useState([]);
  const [activeNotices, setActiveNotices] = useState([]);
  const [currentID, setCurrentID] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState(0);

  const handleOpenModal = (event, id) => {
    event.preventDefault();
    setModalIsOpen(true);
    setModalItem(id);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalItem(0);
  };

  useEffect(() => {
    customAxios
      .get("nurse/me")
      .then((res) => {
        setCurrentID(res.data.responseData.id);
        setIsAdmin(res.data.responseData.admin);
      })
      .catch((error) => {
        console.error("로그인 정보 확인 실패:", error);
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
    ActivateEdit(`${key}/update`, (e) => handleOpenModal(e, key));
  };

  return (
    <Container>
      <S.MainContainer>
        {noticeList.map((notice, i) => (
          <LongPressable
            onLongPress={(e) => {
              if (currentID == notice.writerID) {
                onLongPress(e, notice.id);
              }
            }}
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
                      {currentID == notice.writerID && (
                        <p className="notice_author">ME</p>
                      )}
                      {currentID == notice.writerID ? (
                        <>
                          <p
                            className="notice_writer"
                            style={{ color: "#956eff", fontWeight: "bold" }}
                          >
                            {notice.writerName} 간호사
                          </p>
                          <BsFillPersonFill fill="#956eff" />
                        </>
                      ) : (
                        <>
                          <p className="notice_writer">
                            {notice.writerName} 간호사
                          </p>
                          <BsFillPersonFill />
                        </>
                      )}
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
      <Modal
        visible={modalIsOpen}
        closable={false}
        maskClosable={true}
        onClose={handleCloseModal}
        width="300px"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              maxHeight: "600px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img
              src={trashcan}
              style={{ width: "50px" }}
              alt=""
            />
            <div style={{ fontSize: "14px" }}>정말 삭제하시겠습니까?</div>
            <Button
              variant="danger"
              width="100px"
              height="40px"
              onClick={() => {
                console.log(modalItem);
                customAxios
                  .delete("notice", { data: { id: modalItem } })
                  .then((res) => {
                    console.log("공지사항 삭제 성공", res);
                    navigate(0);
                    setModalIsOpen(false);
                  })
                  .catch((error) => {
                    console.error("공지사항 삭제 실패:", error);
                  });
              }}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
