import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { throttle } from "lodash";

import { useDateStore } from "../../../store/store";

import * as S from "./JournalDatePicker.styles";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

export default function JournalDatePicker() {
  const { selectedDate, setSelectedDate } = useDateStore((state) => state);
  const calendarRef = useRef(null);

  const onScroll = throttle((e) => {
    const scrollWidthOne = calendarRef.current.scrollWidth / 8;
    const currentScroll = e.target.scrollLeft - 220;

    if (currentScroll > 20) {
      const count = Math.abs(Math.round(currentScroll / scrollWidthOne) + 1);
      setSelectedDate(moment(selectedDate).add(count, "days"));
    } else if (currentScroll < -24) {
      const count = Math.abs(
        Math.round(currentScroll / (scrollWidthOne + 12)) - 1,
      );
      setSelectedDate(moment(selectedDate).subtract(count, "days"));
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
  }, [selectedDate]);

  const generateCalendar = () => {
    let datesArray = [];
    for (let i = -6; i <= 6; i++) {
      let thisDate = moment(selectedDate).add(i, "days");
      datesArray.push(
        <S.DateButton
          key={i}
          className={i === 0 ? "active" : null}
          onClick={() => setSelectedDate(thisDate)}
        >
          <p>{thisDate.format("ddd").toUpperCase()}</p>
          <p>{thisDate.date()}</p>
        </S.DateButton>,
      );
    }
    return datesArray;
  };

  return (
    <>
      <S.HorizontalDatePicker>
        <div className="date_yymm">
          <S.MonthButton
            onClick={() =>
              setSelectedDate(moment(selectedDate).subtract(1, "months"))
            }
          >
            <BsFillArrowLeftCircleFill />
          </S.MonthButton>
          <div>{moment(selectedDate).format("YYYY.MM")}</div>
          <S.MonthButton
            onClick={() =>
              setSelectedDate(moment(selectedDate).add(1, "months"))
            }
          >
            <BsFillArrowRightCircleFill />
          </S.MonthButton>
        </div>
        <S.SelectedDateBox></S.SelectedDateBox>
        <S.DateButtonContainer ref={calendarRef}>
          {generateCalendar()}
        </S.DateButtonContainer>
      </S.HorizontalDatePicker>
    </>
  );
}
