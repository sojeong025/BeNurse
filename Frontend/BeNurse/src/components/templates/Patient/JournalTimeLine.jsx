import React, { useEffect, useState } from "react";
import moment from "moment";

import * as S from "./JournalTimeLine.styles";

import { useDateStore } from "../../../store/store";

import { useSwipeable } from "react-swipeable";

import { customAxios } from "../../../libs/axios";

import PatientJournalItem from "./PatientJournalItem";
import empty from "@assets/Images/empty.png";

export default function JournalTimeLine({ patientId }) {
  const [journalList, setJournalList] = useState([]);
  const { selectedDate, setSelectedDate } = useDateStore((state) => state);

  useEffect(() => {
    setSelectedDate(moment().startOf("day"));
  }, []);

  useEffect(() => {
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

  return (
    <>
      <S.TimeLineContainer {...handlers}>
        <S.JournalItemContainer>
          {journalList[0] != undefined ? (
            <>
              {journalList.map((journal) => (
                <PatientJournalItem
                  key={journal.id}
                  journal={journal}
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
      </S.TimeLineContainer>
    </>
  );
}
