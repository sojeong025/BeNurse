import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

import * as S from "./JournalTimeLine.styles";

import { useDateStore } from "../../../store/store";

import { useSwipeable } from "react-swipeable";

import { customAxios } from "../../../libs/axios";

import Button from "../../atoms/Button/Button";
import Modal from "../../atoms/Modal/Modal";

import PatientJournalItem from "./PatientJournalItem";
import empty from "@assets/Images/empty.png";
import trashcan from "@assets/Images/trashcan.png";
import write_loading from "@assets/Images/write_loading.gif";

export default function JournalTimeLine({ patientId }) {
  const [journalList, setJournalList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedDate, setSelectedDate } = useDateStore((state) => state);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(moment().startOf("day"));
    }
    console.log(location.state);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    customAxios
      .post("emr/journal/search", {
        patientID: patientId,
        time: moment(selectedDate)
          .add(1, "day")
          .startOf("day")
          .add(9, "hours")
          .toISOString(),
      })
      .then((res) => {
        console.log("간호일지 목록 불러오기", res.data.responseData);
        const journalList = res.data.responseData.sort((a, b) => {
          let dateA = new Date(a.datetime);
          let dateB = new Date(b.datetime);
          return dateA - dateB;
        });
        setJournalList(journalList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("간호일지 목록 로드 실패:", error);
      });
  }, [selectedDate]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setSelectedDate(moment(selectedDate).add(1, "days")),
    onSwipedRight: () =>
      setSelectedDate(moment(selectedDate).subtract(1, "days")),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

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

  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "calc(100% - 137px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: "0.9",
          }}
        >
          <img
            width="90px"
            height="90px"
            src={write_loading}
            alt=""
          />
        </div>
      ) : (
        <S.TimeLineContainer {...handlers}>
          <S.JournalItemContainer>
            {journalList[0] != undefined ? (
              <>
                {journalList.map((journal) => (
                  <PatientJournalItem
                    key={journal.id}
                    journal={journal}
                    handleOpenModal={handleOpenModal}
                  />
                ))}
                <div className="timeline-border"></div>
              </>
            ) : (
              <div className="timeline-empty">
                <img
                  src={empty}
                  alt=""
                  width="150px"
                  height="150px"
                />
                <p>등록된 기록이 없습니다.</p>
              </div>
            )}
          </S.JournalItemContainer>
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
                  style={{ width: "60px" }}
                  alt=""
                />
                <div>정말 삭제하시겠습니까?</div>
                <Button
                  variant="danger"
                  width="100px"
                  onClick={() => {
                    customAxios
                      .delete("emr/journal?id=" + modalItem)
                      .then((response) => {
                        console.log("간호일지 삭제 성공");
                        navigate(0);
                        setModalIsOpen(false);
                      })
                      .catch((error) => {
                        console.error("간호일지 삭제 실패:", error);
                      });
                  }}
                >
                  삭제하기
                </Button>
              </div>
            </div>
          </Modal>
        </S.TimeLineContainer>
      )}
    </>
  );
}
