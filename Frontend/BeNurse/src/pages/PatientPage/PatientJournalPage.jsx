// // Icons
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { throttle } from "lodash";

import * as S from "./PatientJournalPage.styles";

// Components
import Container from "../../components/atoms/Container/Container";
import CreatePencilButton from "../../components/atoms/Button/CreatePencilButton";
import BottomSelectPanel from "../../components/templates/BottomSelectPanel/BottomSelectPanel";
import PatientJournalItem from "../../components/templates/Patient/PatientJournalItem";

// Icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PatientJournalPage = () => {
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

  const [date, setDate] = useState(moment());
  const calendarRef = useRef(null);

  const onScroll = throttle((e) => {
    const scrollWidthOne = calendarRef.current.scrollWidth / 8;
    const currentScroll = e.target.scrollLeft - 220;

    if (currentScroll > 20) {
      const count = Math.abs(Math.round(currentScroll / scrollWidthOne) + 1);
      setDate((prevDate) => moment(prevDate).add(count, "days"));
    } else if (currentScroll < -24) {
      const count = Math.abs(
        Math.round(currentScroll / (scrollWidthOne + 12)) - 1,
      );
      setDate((prevDate) => moment(prevDate).subtract(count, "days"));
    } else {
      calendarRef.current.scrollLeft = 220;
    }
  }, 400);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    calendarEl.addEventListener("scroll", onScroll);
    return () => {
      calendarEl.removeEventListener("scroll", onScroll);
      calendarEl.scrollLeft = 220;
    };
  }, [onScroll]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    calendarEl.scrollLeft = 219;
  }, [date]);

  const generateCalendar = () => {
    let datesArray = [];
    for (let i = -6; i <= 6; i++) {
      let thisDate = moment(date).add(i, "days");
      datesArray.push(
        <S.DateButton
          key={i}
          className={i === 0 ? "active" : null}
          onClick={() => setDate(thisDate)}
        >
          <p>{thisDate.format("ddd").toUpperCase()}</p>
          <p>{thisDate.date()}</p>
        </S.DateButton>,
      );
    }
    return datesArray;
  };

  return (
    <Container>
      <S.MainContainer>
        <S.HorizontalDatePicker>
          <div className="date_yymm">
            <S.MonthButton
              onClick={() => setDate(moment(date).subtract(1, "months"))}
            >
              <MdKeyboardArrowLeft />
            </S.MonthButton>
            <div>{moment(date).format("YYYY.MM")}</div>
            <S.MonthButton
              onClick={() => setDate(moment(date).add(1, "months"))}
            >
              <MdKeyboardArrowRight />
            </S.MonthButton>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "180px",
              backgroundColor: "#ffffffe0",
              width: "50px",
              height: "70px",
              zIndex: "0",
              borderRadius: "10px",
            }}
          ></div>
          <S.DateButtonContainer ref={calendarRef}>
            {generateCalendar()}
          </S.DateButtonContainer>
        </S.HorizontalDatePicker>

        <S.TimeLineContainer>
          <S.JournalItemContainer>
            {journalItems.map((journal, i) => {
              if (journal.time.isSame(date, "day")) {
                return (
                  <PatientJournalItem
                    id={i}
                    journal={journal}
                  />
                );
              }
            })}
            <div className="timeline-border"></div>
          </S.JournalItemContainer>
        </S.TimeLineContainer>
        <div
          style={{
            position: "absolute",
            right: "14px",
            bottom: "80px",
            zIndex: 1,
          }}
        >
          <CreatePencilButton />
        </div>
        <BottomSelectPanel
          modifyLabel={"일지 수정"}
          deleteLabel={"일지 삭제"}
        />
      </S.MainContainer>
    </Container>
  );
};

export default PatientJournalPage;
