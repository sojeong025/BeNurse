import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineNotification } from "react-icons/ai";
import { TbBulb } from "react-icons/tb";
import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import Box from "../../components/atoms/Box/Box";

import * as S from "./MainPage.styles";
import main_nurse from "@assets/Images/main_nurse.png";
import { ButtonContainer } from "../LoginPage/JoinPage.styles";

import moment from "moment";

function MainPage() {
  const dates = [];
  const types = ["day", "night", "evening", "off"];
  const today = moment();
  const startOfWeek = today.clone().startOf("week");

  for (let i = 0; i < 7; i++) {
    const date = startOfWeek.clone().add(i, "days");
    const dayOfWeek = date.format("ddd").toUpperCase();
    const randomType = types[Math.floor(Math.random() * types.length)]; // 랜덤으로 타입 선택
    dates.push({ date, dayOfWeek, type: randomType });
  }

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
        <S.TipBoxContainer>
          <Box
            type="white"
            size={["160px", "120px"]}
          >
            <S.TipBox>
              <TbBulb />
              <div>
                <p className="title">임상 실무팁</p>
                <p className="desc">출혈 - 내출혈 케이스</p>
              </div>
            </S.TipBox>
          </Box>
          <Box
            type="white"
            size={["160px", "120px"]}
          >
            <S.TipBox>
              <TbBulb />
              <div>
                <p className="title">임상 실무팁</p>
                <p className="desc">출혈 - 내출혈 케이스</p>
              </div>
            </S.TipBox>
          </Box>
          <Box
            type="white"
            size={["160px", "120px"]}
          >
            <S.TipBox>
              <TbBulb />
              <div>
                <p className="title">임상 실무팁</p>
                <p className="desc">출혈 - 내출혈 케이스</p>
              </div>
            </S.TipBox>
          </Box>
        </S.TipBoxContainer>
      </S.MainContainer>
    </Container>
  );
}

export default MainPage;
