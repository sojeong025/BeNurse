import React from "react";
import moment from "moment";

import * as S from "./JournalTimeLine.styles";

import { useDateStore } from "../../../store/store";

import { useSwipeable } from "react-swipeable";

import PatientJournalItem from "./PatientJournalItem";
import empty from "@assets/Images/empty.png";

export default function JournalTimeLine() {
  const journalItems = [
    {
      time: moment().add(1, "days"),
      content: `ativan, botropase, adelavin, bromhxine, gaaster, cefteriaxone, H/S
            1000ml 12000cc/hr, H/S 1000ml 12000cc/hr ativan, botropase,
            adelavin, bromhxine, gaaster, cefteriaxone, H/S 1000ml 12000cc/hr,
            H/S 1000ml 12000cc/hr`,
      writer: "정은경",
    },
    {
      time: moment().add(1, "days"),
      content: `머엉..`,
      writer: "정소정",
    },
    {
      time: moment().add(1, "days"),
      content: `이거는 내일임`,
      writer: "김대웅",
    },
    {
      time: moment().subtract(1, "days"),
      content: `ativan, botropase, adelavin, bromhxine, gaaster, cefteriaxone, H/S
            1000ml 12000cc/hr, H/S 1000ml 12000cc/hr ativan, botropase,
            adelavin, bromhxine, gaaster, cefteriaxone, H/S 1000ml 12000cc/hr,
            H/S 1000ml 12000cc/hr`,
      writer: "정은경",
    },
    {
      time: moment().subtract(1, "days"),
      content: `머엉..`,
      writer: "정소정",
    },
    {
      time: moment().subtract(1, "days"),
      content: `아마도,...어제일걸요`,
      writer: "김대웅",
    },
    {
      time: moment(),
      content: `ativan, botropase, adelavin, bromhxine, gaaster, cefteriaxone, H/S
            1000ml 12000cc/hr, H/S 1000ml 12000cc/hr ativan, botropase,
            adelavin, bromhxine, gaaster, cefteriaxone, H/S 1000ml 12000cc/hr,
            H/S 1000ml 12000cc/hr`,
      writer: "정은경",
    },
    {
      time: moment(),
      content: `머엉..`,
      writer: "정소정",
    },
    {
      time: moment(),
      content: `돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라`,
      writer: "김대웅",
    },
    {
      time: moment(),
      content: `ativan, botropase, adelavin, bromhxine, gaaster, cefteriaxone, H/S
            1000ml 12000cc/hr, H/S 1000ml 12000cc/hr ativan, botropase,
            adelavin, bromhxine, gaaster, cefteriaxone, H/S 1000ml 12000cc/hr,
            H/S 1000ml 12000cc/hr`,
      writer: "정은경",
    },
    {
      time: moment(),
      content: `머엉..`,
      writer: "정소정",
    },
    {
      time: moment(),
      content: `돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라돼라`,
      writer: "김대웅",
    },
  ];

  const { selectedDate, setSelectedDate } = useDateStore((state) => state);

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
          {journalItems.map((journal, i) => {
            if (journal.time.isSame(selectedDate, "day")) {
              return (
                <PatientJournalItem
                  key={i}
                  journal={journal}
                />
              );
            }
          })}
          {journalItems.filter((el) => el.time.isSame(selectedDate, "day"))
            .length > 0 ? (
            <div className="timeline-border"></div>
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
