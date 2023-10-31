import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Modal from "../../atoms/Modal/Modal";
import NurseItem from "./NurseItem";
import no from "@assets/Images/no.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import off from "@assets/Icons/off.svg";
import {
  CalendarWrapper,
  Header,
  Table,
  WeekdayRow,
  Weekday,
  StateWrapper,
  State,
  Td,
  ScheduleTypeCircle,
  NurseScrollWrapper,
} from "./ScheduleCalendar.styles";
import { NavLink } from "react-router-dom";
import { Common } from "../../../utils/global.styles";
import BottomSelectPanel from "../BottomSelectPanel/BottomSelectPanel";

export default function ScheduleCalendar() {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const handlers = useSwipeable({
    onSwipedLeft: () => nextMonth(),
    onSwipedRight: () => prevMonth(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const createCalendar = (date) => {
    const startDay = date.getDay();
    const totalDays = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    const prevMonthTotalDays = new Date(
      date.getFullYear(),
      date.getMonth(),
      0,
    ).getDate();

    let dates = [];
    for (let i = 1; i <= totalDays; i++) {
      dates.push({ day: i, isCurMonth: true, type: getRandomType() });
    }

    for (let i = 0; i < startDay; i++) {
      dates.unshift({ day: prevMonthTotalDays - i, isCurMonth: false });
    }

    let nextMonthDay = 1;
    while (dates.length < 42) {
      dates.push({ day: nextMonthDay++, isCurMonth: false });
    }

    let weeks = [];
    while (dates.length) {
      weeks.push(dates.splice(0, 7));
    }

    return weeks;
  };

  const getRandomType = () => {
    const types = ["day", "evening", "night", "off"];
    return types[Math.floor(Math.random() * types.length)];
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isOffApplicationPossible = () => {
    const currentDay = currentDate.getDate();
    return currentDay >= 10 && currentDay <= 20;
  };

  const handleOffApplicationClick = (event) => {
    if (!isOffApplicationPossible()) {
      event.preventDefault();
      setModalIsOpen(true);
    }
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const weeks = createCalendar(currentDate);

  return (
    <CalendarWrapper {...handlers}>
      <Header>
        <div style={{ display: "flex" }}>
          <button onClick={prevMonth}>
            <MdKeyboardArrowLeft />
          </button>
          <h2>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </h2>
          <button onClick={nextMonth}>
            <MdKeyboardArrowRight />
          </button>
        </div>
        <div>
          <NavLink
            to="/off-application"
            onClick={handleOffApplicationClick}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffffff",
              }}
            >
              <img
                src={off}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
              <div style={{ fontSize: "12px" }}>오프신청</div>
            </div>
          </NavLink>
          <Modal
            visible={modalIsOpen}
            closable={false}
            maskClosable={true}
            onClose={handleCloseModal}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={no}
                style={{ width: "64px", marginBottom: "10px" }}
                alt=""
              />
              <div
                style={{
                  fontSize: Common.fontSize.fontM,
                  fontWeight: Common.fontWeight.bold,
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                오프 신청 기간이 아닙니다.
              </div>
              <div
                style={{
                  fontSize: Common.fontSize.fontXS,
                  fontWeight: Common.fontWeight.regular,
                  lineHeight: "22px",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                다음 오프 신청 기간
                <br />
                {currentDate.getFullYear()}.{currentDate.getMonth() + 3}.10 ~
                {currentDate.getFullYear()}.{currentDate.getMonth() + 3}.20
              </div>
            </div>
          </Modal>
        </div>
      </Header>
      <StateWrapper>
        <State type={"day"}>DAY</State>
        <State type={"evening"}>EVENING</State>
        <State type={"night"}>NIGHT</State>
        <State type={"off"}>OFF</State>
      </StateWrapper>
      <Table>
        <thead>
          <WeekdayRow>
            <Weekday style={{ color: "red" }}>일</Weekday>
            <Weekday>월</Weekday>
            <Weekday>화</Weekday>
            <Weekday>수</Weekday>
            <Weekday>목</Weekday>
            <Weekday>금</Weekday>
            <Weekday>토</Weekday>
          </WeekdayRow>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((date, j) => (
                <Td
                  lastRow={i === weeks.length - 1}
                  key={j}
                  isCurMonth={date.isCurMonth}
                  isSunday={j === 0}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onClick={(e) => {
                      console.log(date.day);
                      setOpen(true);
                    }}
                  >
                    {date.day}
                    {date.isCurMonth && (
                      <ScheduleTypeCircle type={date.type}>
                        {date.type.charAt(0).toUpperCase()}
                      </ScheduleTypeCircle>
                    )}
                  </div>
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <BottomSheet
        open={open}
        onDismiss={() => {
          setOpen(false);
        }}
      >
        <NurseScrollWrapper>
          <span
            style={{
              color: Common.color.black02,
              fontSize: Common.fontSize.fontM,
              fontWeight: Common.fontWeight.bold,
            }}
          >
            2023.11.12 (일)
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "20px",
            }}
          >
            <NurseItem />
            <NurseItem />
            <NurseItem />
            <NurseItem />
            <NurseItem />
            <NurseItem />
            <NurseItem />
            <NurseItem />
          </div>
        </NurseScrollWrapper>
      </BottomSheet>
    </CalendarWrapper>
  );
}
