// // Icons
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { throttle } from "lodash";

import * as S from "./PatientJournalPage.styles";

// Components
import Container from "../../components/atoms/Container/Container";
import CreatePencilButton from "../../components/atoms/Button/CreatePencilButton";
import PatientJournalItem from "../../components/templates/Patient/PatientJournalItem";

// Icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PatientJournalPage = () => {
  const [date, setDate] = useState(moment());
  const calendarRef = useRef(null);

  const onScroll = throttle((e) => {
    if (e.target.scrollLeft > 24) {
      setDate((prevDate) => moment(prevDate).add(1, "days"));
    } else if (e.target.scrollLeft < 12) {
      setDate((prevDate) => moment(prevDate).subtract(1, "days"));
    }
  }, 300);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    calendarEl.addEventListener("scroll", onScroll);
    return () => {
      calendarEl.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    calendarEl.scrollLeft = 20;
  }, [date]);

  const generateCalendar = () => {
    let datesArray = [];
    for (let i = -3; i <= 3; i++) {
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

          <S.DateButtonContainer ref={calendarRef}>
            {generateCalendar()}
          </S.DateButtonContainer>
        </S.HorizontalDatePicker>

        <S.TimeLineContainer>
          <S.JournalItemContainer>
            <PatientJournalItem id={1} />
            <PatientJournalItem id={2} />
            <PatientJournalItem id={3} />
            <PatientJournalItem id={4} />
            <PatientJournalItem id={5} />
            <PatientJournalItem id={6} />
            <PatientJournalItem id={7} />
            <PatientJournalItem id={8} />
            <PatientJournalItem id={9} />
            <PatientJournalItem id={10} />
            <div className="timeline-border"></div>
          </S.JournalItemContainer>
        </S.TimeLineContainer>
      </S.MainContainer>
    </Container>
  );
};

export default PatientJournalPage;
