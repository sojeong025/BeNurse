import React, { useEffect, useState } from "react";
import Box from "../../components/atoms/Box/Box";
import { Common } from "../../utils/global.styles";
import calendar from "@assets/Images/calendar.png";
import Input from "@components/atoms/Input/Input";
import { customAxios } from "../../libs/axios";
import AdminCalendar from "../../components/templates/Admin/AdminCalendar";
import nurseImg from "@assets/Images/patient_temp.png";

export default function ScheduleCreateIntroPage() {
  const [step, setStep] = useState(0);
  const [selectedNurseId, setSelectedNurseId] = useState(null);
  const [entireNurse, setEntireNurse] = useState(null);
  const [entireWard, setEntireWard] = useState(null);
  const [offApply, setOffApply] = useState(null);
  const [offKeys, setOffKeys] = useState([]);

  const RenderOffApply = () => {
    console.log(offApply);
  };

  useEffect(() => {
    customAxios.get("ward/all").then((res) => {
      setEntireWard(res.data.responseData);
    });

    customAxios.get("nurse/all").then((res) => {
      setEntireNurse(res.data.responseData);
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
  return (
    <Box
      type={"white"}
      size={step === 2 ? ["1200px", "600px"] : ["600px", "500px"]}
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
              transform: "rotate(8deg)",
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
            height: "360px",
            gap: "70px",
          }}
        >
          <p style={{ fontSize: Common.fontSize.fontXL }}>
            병동에 근무하는 인원은 총 몇명인가요?
          </p>
          <Input variant={"default"} />
        </div>
      )}
      {step === 2 && (
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
              <AdminCalendar />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                width: "400px",
                height: "460px",
              }}
            >
              {entireNurse.map((nurse) => {
                const ward = entireWard.filter(
                  (ward) => ward.id === nurse.wardID,
                );

                return (
                  <Box
                    type={"white"}
                    size={["340px", "80px"]}
                    props={"gap: 14px; cursor: pointer;"}
                    onClick={() => {
                      setSelectedNurseId(nurse.id);
                    }}
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
                      <p>
                        {ward[0]?.name} {nurse.annual}년차
                      </p>
                    </div>
                  </Box>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                height: "460px",
                fontSize: "16px",
                gap: "30px",
              }}
            >
              <p>OFF 신청 목록</p>
              {offKeys.map((key) => {
                const nurseName = entireNurse.filter(
                  (nurse) => nurse.id === offApply[key][0].nurseID,
                );
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <p>{nurseName[0].name} 간호사</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <p>신청 날짜</p>
                      {offApply[key].map((apply) => (
                        <p>{apply.offdate}</p>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <p>사유</p>
                      <p>{key}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "360px",
            gap: "70px",
          }}
        >
          3
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
      ) : (
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
              setStep((step) => step + 1);
            }}
          >
            다음
          </Box>
        </div>
      )}
    </Box>
  );
}
