import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineNotification } from "react-icons/ai";

import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import Box from "../../components/atoms/Box/Box";

import NurseTip from "./NurseTip";

import * as S from "./MainPage.styles";
import main_nurse from "@assets/Images/main_nurse.png";

import { useTabBarStore } from "../../store/store";
import { customAxios } from "../../libs/axios";

import moment from "moment";

function MainPage() {
  const { setCurrentTab } = useTabBarStore((state) => state);
  const [schedule, setSchedule] = useState([]);

  const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
  const endOfWeek = moment().endOf("week").format("YYYY-MM-DD");

  useEffect(() => {
    setCurrentTab("main");
    customAxios
      .get(`Schedule?endDate=${endOfWeek}&startDate=${startOfWeek}`)
      .then((res) => {
        const sortedData = res.data.responseData.sort((a, b) => {
          return moment(a.workdate).isBefore(b.workdate) ? -1 : 1;
        });
        setSchedule(sortedData);
      })
      .catch((error) => {
        console.error("내 주간 근무 일정 로드 실패:", error);
      });
  }, []);

  const dates = schedule.map((item) => ({
    date: moment(item.workdate),
    dayOfWeek: moment(item.workdate).format("ddd").toUpperCase(),
    type: item.worktime,
  }));

  return (
    <Container overflow={"hidden"}>
      <S.MainContainer>
        <S.TopContainer>
          <S.BtnContainer>
            <Link
              to="/mypage"
              style={{ width: "100%" }}
            >
              <Button
                width="100%"
                height="80px"
              >
                <S.ButtonContent>
                  <AiOutlineUser />
                  <div>마이페이지</div>
                </S.ButtonContent>
              </Button>
            </Link>
            <Link
              to="/notice"
              style={{ width: "100%" }}
            >
              <Button
                variant="primary"
                width="100%"
                height="80px"
              >
                <S.ButtonContent>
                  <AiOutlineNotification />
                  <div>공지사항</div>
                </S.ButtonContent>
              </Button>
            </Link>
          </S.BtnContainer>

          <img
            src={main_nurse}
            alt="main_nurse"
            width="200px"
            style={{ marginBottom: "-10px" }}
          />
        </S.TopContainer>
        <S.StyledHr />
        <div style={{ width: "calc(100% - 28px)" }}>
          <S.MainTitle>
            <p>주간 스케쥴</p>
            <Link to="/schedule">전체 보기 {">"} </Link>
          </S.MainTitle>
          <Box
            type="white"
            size={["100%", "150px"]}
            margin="0 0 20px 0"
          >
            <S.scheduleDayBox>
              {dates.map((item, index) => (
                <S.scheduleDay
                  key={index}
                  type={item.type}
                >
                  <p className="day">{item.dayOfWeek}</p>
                  <p className="date">{item.date.date()}</p>
                  <div className="type">
                    {item.type.charAt(0).toUpperCase()}
                  </div>
                </S.scheduleDay>
              ))}
            </S.scheduleDayBox>
          </Box>
        </div>
        <S.StyledHr />
        <S.MainTitle style={{ width: "calc(100% - 28px)" }}>
          <p>간호 Tip</p>
        </S.MainTitle>
        <NurseTip></NurseTip>
      </S.MainContainer>
    </Container>
  );
}

export default MainPage;
