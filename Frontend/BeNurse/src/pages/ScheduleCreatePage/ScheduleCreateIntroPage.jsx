import React, { useEffect, useState } from "react";
import Box from "../../components/atoms/Box/Box";
import { Common } from "../../utils/global.styles";
import calendar from "@assets/Images/calendar.png";
import Input from "@components/atoms/Input/Input";
import { customAxios } from "../../libs/axios";
import AdminCalendar from "../../components/templates/Admin/AdminCalendar";
import nurseImg from "@assets/Images/patient_temp.png";
import schedule from "@assets/Images/schedule.png";
import OffApplyItem from "../../components/templates/Schedule/OffApplyItem";
import { useOffDateStore } from "../../store/store";
import { BsCheck } from "react-icons/bs";
import { main } from "./shift_work.tsx";
import { useNavigate } from "react-router-dom";
import loading from "@assets/Images/create_loading.gif";

export default function ScheduleCreateIntroPage() {
  const [step, setStep] = useState(0);
  const {
    selectedNurseId,
    setSelectedNurseId,
    selectedDates,
    setSelectedDates,
  } = useOffDateStore((state) => state);
  const [entireNurse, setEntireNurse] = useState(null);
  const [entireWard, setEntireWard] = useState(null);
  const [offApply, setOffApply] = useState(null);
  const [offKeys, setOffKeys] = useState([]);
  const [nurseList, setNurseList] = useState({});
  const [createComplete, setCreateComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    customAxios.get("ward/all").then((res) => {
      setEntireWard(res.data.responseData);
    });

    customAxios.get("nurse/all").then((res) => {
      setEntireNurse(res.data.responseData);
      const newNurseList = {};
      res.data.responseData.map((nurse) => {
        const nurseData = {
          name: nurse.id,
          career: nurse.annual,
          off_day: [],
        };
        newNurseList[nurse.id] = nurseData;
      });
      setNurseList(newNurseList);
    });

    customAxios.get("Offschedule/all").then((res) => {
      const newOffApply = {};
      res.data.responseData.map((apply) => {
        const reason = apply.reason;
        if (newOffApply[reason]) {
          newOffApply[reason].push({
            nurseID: apply.nurseID,
            offdate: apply.offdate,
          });
        } else {
          newOffApply[reason] = [
            {
              nurseID: apply.nurseID,
              offdate: apply.offdate,
            },
          ];
        }
      });
      setOffApply(newOffApply);
      setOffKeys(Object.keys(newOffApply));
    });
  }, []);

  const createSchedule = () => {
    const month = new Date().getMonth() + 1;
    const newSchedule = main(
      entireNurse.length,
      month,
      2023,
      Object.values(nurseList),
    );
    console.log(newSchedule);
    setStep((step) => step + 1);
    setTimeout(() => {
      setCreateComplete(true);
    }, 3500);
  };

  const addOffDates = (id) => {
    const newNurseList = nurseList;
    newNurseList[id].off_day = selectedDates;
    setNurseList(newNurseList);
    setSelectedDates(() => []);
  };

  return (
    <Box
      type={"white"}
      size={step === 1 ? ["1200px", "600px"] : ["600px", "500px"]}
      props={"flex-direction: column; font-size: 16px;"}
      flex={["space-around", "center"]}
    >
      {step === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "360px",
            gap: "70px",
          }}
        >
          <img
            style={{
              marginTop: "30px",
              width: "180px",
            }}
            src={calendar}
            alt=""
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <p style={{ fontSize: Common.fontSize.fontXL }}>
              근무표 만들기를 시작합니다
            </p>
            <p style={{ fontSize: Common.fontSize.fontXL }}>
              단계를 거칠수록 좋은 근무표가 나올거에요.
            </p>
          </div>
        </div>
      )}
      {step === 1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "460px",
            gap: "70px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div>
              <AdminCalendar type={"create"} />
            </div>
            <div>
              <p>병동 내 간호사 목록</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                  width: "400px",
                  height: "460px",
                  overflow: "scroll",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {entireNurse?.map((nurse, index) => {
                    const ward = entireWard.filter(
                      (ward) => ward.id === nurse.wardID,
                    );

                    return (
                      <Box
                        key={index}
                        type={"white"}
                        size={["340px", "80px"]}
                        props={
                          "gap: 14px; cursor: pointer; box-sizing: border-box; padding: 20px;"
                        }
                      >
                        <img
                          style={{
                            width: "50px",
                            borderRadius: "30px",
                            border: "1px solid gray",
                          }}
                          src={nurseImg}
                          alt=""
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "200px",
                            gap: "6px",
                          }}
                        >
                          <p>{nurse.name} 간호사</p>
                          <p style={{ fontSize: "14px" }}>
                            {ward[0]?.name} {nurse.annual}년차
                          </p>
                        </div>
                        {selectedNurseId === nurse.id ? (
                          <Box
                            type={"purple02"}
                            size={["70px", "40px"]}
                            props={"font-size: 12px;"}
                            onClick={() => {
                              setSelectedNurseId(null);
                              addOffDates(nurse.id);
                            }}
                          >
                            <BsCheck size={24} />
                          </Box>
                        ) : nurseList &&
                          nurseList[nurse.id].off_day.length > 0 ? (
                          <Box
                            type={"purple03"}
                            size={["70px", "40px"]}
                            props={"font-size: 12px;"}
                            onClick={() => {
                              if (nurseList && nurseList[nurse.id].off_day) {
                                setSelectedDates(
                                  () => nurseList[nurse.id].off_day,
                                );
                              } else if (selectedDates) {
                                setSelectedDates(() => null);
                              }
                              setSelectedNurseId(nurse.id);
                            }}
                          >
                            오프 보기
                          </Box>
                        ) : (
                          <Box
                            type={"purple01"}
                            size={["70px", "40px"]}
                            props={"font-size: 12px;"}
                            onClick={() => {
                              if (nurseList && nurseList[nurse.id].off_day) {
                                setSelectedDates(
                                  () => nurseList[nurse.id].off_day,
                                );
                              } else if (selectedDates) {
                                setSelectedDates(() => null);
                              }
                              setSelectedNurseId(nurse.id);
                            }}
                          >
                            Off 선택
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                height: "560px",
                fontSize: "16px",
                gap: "10px",
              }}
            >
              <p>OFF 신청 목록</p>
              <div style={{ overflow: "scroll" }}>
                {offKeys.map((offkey, index) => {
                  const nurseName = entireNurse?.filter(
                    (nurse) => nurse.id === offApply[offkey][0].nurseID,
                  );
                  return (
                    <OffApplyItem
                      key={index}
                      nurseName={nurseName}
                      offApply={offApply}
                      offkey={offkey}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "360px",
            gap: "70px",
          }}
        >
          <img
            style={{ width: "260px" }}
            src={loading}
            alt=""
          />
        </div>
      )}
      {step < 1 ? (
        <Box
          type={"purple03"}
          size={["200px", "60px"]}
          props={"cursor: pointer;"}
          onClick={() => {
            setStep((step) => step + 1);
          }}
        >
          시작하기
        </Box>
      ) : step === 1 ? (
        <div
          style={{
            display: "flex",
            gap: "30px",
            transition: "all 0.4s",
          }}
        >
          <Box
            type={"white"}
            size={["180px", "60px"]}
            props={"cursor: pointer;"}
            onClick={() => {
              setStep((step) => step - 1);
            }}
          >
            이전
          </Box>
          <Box
            type={"purple03"}
            size={["180px", "60px"]}
            props={"cursor: pointer;"}
            onClick={() => {
              createSchedule();
            }}
          >
            근무표 생성하기
          </Box>
        </div>
      ) : (
        <Box
          type={createComplete ? "purple03" : "purple01"}
          size={["200px", "60px"]}
          props={"cursor: pointer;"}
          onClick={() => {
            navigate("../main");
          }}
        >
          {createComplete ? "생성 완료!" : "잠시 기다려주세요.."}
        </Box>
      )}
    </Box>
  );
}
