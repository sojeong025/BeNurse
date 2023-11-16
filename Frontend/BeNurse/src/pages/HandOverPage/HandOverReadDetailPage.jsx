import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "@components/atoms/Container/Container";
import * as S from "./HandOverReadDetailPage.styles";
import moment from "moment";

import { customAxios } from "../../libs/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function HandOverReadDetailPage() {
  const { handoversetId, patientID } = useParams();
  const [journalDatas, setJournalDatas] = useState([]);

  const [handoverDetails, setHandoverDetails] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    customAxios
      .get("HandoverSet/details", {
        params: {
          ID: handoversetId,
          patientID: patientID,
        },
      })
      .then((res) => {
        setHandoverDetails(res.data.responseData);
        const journalIds = res.data.responseData[0]?.journals;
        if (journalIds) {
          journalIds.map((item) => {
            customAxios
              .get("emr/journal", {
                params: {
                  id: item.journalID,
                },
              })
              .then((res) => {
                setJournalDatas((prevData) => [
                  ...prevData,
                  res.data.responseData,
                ]);
              });
          });
        }
      });
  }, [handoversetId, patientID]);

  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <div style={{ marginTop: "84px", paddingTop: "24px" }}>
        <Swiper
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={true}
          modules={[Pagination]}
          className="mySwiper"
          style={{ width: "384px", height: "130px" }}
        >
          <SwiperSlide>
            <S.SwiperMain>
              <p className="title">간호일지(Nursing log)</p>
              <p className="context">
                간호일지의 변경상황을 확인하고, <br />
                인계자가 추가적으로 남긴 코멘트를 확인하세요
              </p>
            </S.SwiperMain>
          </SwiperSlide>
          <SwiperSlide>
            <S.SwiperMain>
              <p className="title">주호소(Cheif Complain)</p>
              <p className="context">
                환자가 가장 먼저 언급하거나 가장 걱정되는 증상입니다. <br />
                인계자가 추가적으로 남긴 코멘트를 확인하세요
              </p>
            </S.SwiperMain>
          </SwiperSlide>
          <SwiperSlide>
            <S.SwiperMain>
              <p className="title">특이 사항(Significant)</p>
              <p className="context">
                환자의 건강 상태나 간호 중 특별한 사항을 의미합니다.
                <br />
                인계자가 추가적으로 남긴 코멘트를 확인하세요
              </p>
            </S.SwiperMain>
          </SwiperSlide>
          <SwiperSlide>
            <S.SwiperMain>
              <p className="title">기타 사항(ETC)</p>
              <p className="context">
                환자 관리에 필요한 기타 정보를 의미합니다.
                <br />
                인계자가 추가적으로 남긴 코멘트를 확인하세요
              </p>
            </S.SwiperMain>
          </SwiperSlide>
        </Swiper>
        <div style={{ overflowY: "scroll" }}>
          {activeIndex === 0 && (
            <S.SwiperContainer>
              <div>
                {handoverDetails[0]?.journals?.map((item, index) => {
                  const correspondingJournal = journalDatas.find(
                    (journal) => journal.id === item.journalID,
                  );
                  return (
                    <S.handovercontent key={index}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {correspondingJournal && (
                          <S.nursingLog type={correspondingJournal.category}>
                            <div className="journal_type">
                              {correspondingJournal.category}
                            </div>
                            <div className="journal_content">
                              {correspondingJournal.content}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div className="time_label">
                                🕑 &nbsp;
                                {moment(correspondingJournal.datetime).format(
                                  "HH:mm",
                                )}
                              </div>
                              <div className="journal_nursename">
                                {correspondingJournal.name} 간호사
                              </div>
                            </div>
                          </S.nursingLog>
                        )}
                        <div style={{ display: "flex" }}>
                          <div className="icon">✦</div>
                          <div>{item.comment}</div>
                        </div>
                      </div>
                    </S.handovercontent>
                  );
                })}
              </div>
            </S.SwiperContainer>
          )}
          {activeIndex === 1 && (
            <S.SwiperContainer>
              {handoverDetails[0]?.cc?.map((item, index) => (
                <S.handovercontent key={index}>
                  <div style={{ display: "flex" }}>
                    <div className="icon">✦</div> <div>{item}</div>
                  </div>
                </S.handovercontent>
              ))}
            </S.SwiperContainer>
          )}
          {activeIndex === 2 && (
            <S.SwiperContainer>
              {handoverDetails[0]?.special?.map((item, index) => (
                <S.handovercontent key={index}>
                  <div style={{ display: "flex" }}>
                    <div className="icon">✦</div> <div>{item}</div>
                  </div>
                </S.handovercontent>
              ))}
            </S.SwiperContainer>
          )}
          {activeIndex === 3 && (
            <S.SwiperContainer>
              {handoverDetails[0]?.etc?.map((item, index) => (
                <S.handovercontent key={index}>
                  <div style={{ display: "flex" }}>
                    <div className="icon">✦</div> <div>{item}</div>
                  </div>
                </S.handovercontent>
              ))}
            </S.SwiperContainer>
          )}
        </div>
      </div>
    </Container>
  );
}
