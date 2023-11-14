import React, { useState, useEffect } from "react";
import { Common } from "../../utils/global.styles";
import Box from "../../components/atoms/Box/Box";
import Input from "@components/atoms/Input/Input";
import { customAxios } from "../../libs/axios";
import { useModalStore } from "../../store/store";
import { useInviteStore } from "../../store/store";
import AdminManagementItem from "../../components/templates/Admin/AdminManagementItem";

export default function AdminManagementPage() {
  const [devices, setDevices] = useState(null);
  const [nurses, setNurses] = useState(null);
  const [wards, setWards] = useState(null);
  const [edit, setEdit] = useState("");
  const [count, setCount] = useState(30);
  const [nurseName, setNurseName] = useState("");
  const [showWardForm, setShowWardForm] = useState(false);
  const [inviteCode, setInviteCode] = useState(null);
  const { isComplete, setIsComplete } = useInviteStore((state) => state);
  const { isModal, OpenModal, CloseModal } = useModalStore((state) => state);

  const inputName = (e) => {
    setNurseName(e.target.value);
  };

  const createInviteCode = () => {
    if (nurseName !== "") {
      const data = {
        name: nurseName,
      };
      customAxios.post("invite", data).then((res) => {
        const code = res.data.responseData.split("");
        setInviteCode(code);
        setTimeout(() => {
          CloseModal();
          setInviteCode(null);
          setCount(30);
        }, 30000);
      });
    } else {
      console.log("성명을 입력하세요.");
    }
  };

  const createWard = () => {
    // customAxios.post;
  };

  const onNurseSave = () => {
    customAxios
      .put(`nurse/updateall`, nurses)
      .then((res) => {
        console.log("간호사 수정 완료", res);
      })
      .catch((error) => {
        console.error("간호사 수정 실패", error);
      });
  };

  const closeInviteModal = (e) => {
    if (e.target === e.currentTarget) {
      CloseModal();
      setInviteCode(null);
      setCount(30);
    }
  };

  useEffect(() => {
    if (isComplete) {
      CloseModal();
      setInviteCode(null);
      setCount(30);
      setIsComplete(false);
    }
  }, [isComplete]);

  useEffect(() => {
    customAxios.get("ward/all").then((res) => {
      setWards(res.data.responseData);
      console.log(res.data.responseData);
    });
    customAxios.get("nurse/all").then((res) => {
      setNurses(res.data.responseData);
      console.log(res.data.responseData);
    });
    customAxios.get("device/all").then((res) => {
      setDevices(res.data.responseData);
      console.log(res.data.responseData);
    });
  }, []);

  useEffect(() => {
    if (inviteCode) {
      const id = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);

      if (count === 0) {
        clearInterval(id);
      }
      return () => {
        clearInterval(id);
      };
    }
  }, [count, inviteCode]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
        backgroundColor: Common.color.purple00,
        gap: "40px",
      }}
    >
      {/* 병동 관리 */}
      <Box
        type={"white"}
        size={["430px", "540px"]}
        flex={["flex-start", "flex-start"]}
        props={"flex-direction: column; padding: 30px; box-sizing: border-box;"}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p style={{ fontSize: "20px", fontWeight: Common.fontWeight.bold }}>
              병동 관리
            </p>
            <Box
              type={"purple03"}
              size={["24px", "24px"]}
              props={"cursor: pointer; font-size: 16px;"}
              onClick={() => {
                OpenModal("ward");
              }}
            >
              +
            </Box>
          </div>
          {edit === "병동 관리" ? (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
              onClick={() => {
                setEdit("");
              }}
            >
              취소
            </Box>
          ) : (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
              onClick={() => {
                setEdit("병동 관리");
              }}
            >
              편집
            </Box>
          )}
        </div>
        <hr style={{ width: "100%", margin: "20px 0px" }} />
        {wards?.map((item, i) => {
          return (
            <AdminManagementItem
              type={"ward"}
              item={item}
              edit={edit}
              key={i}
              wards={wards}
              setWards={setWards}
            />
          );
        })}
      </Box>

      {/* 간호사 관리 */}
      <Box
        type={"white"}
        size={["430px", "540px"]}
        flex={["flex-start", "flex-start"]}
        props={"flex-direction: column; padding: 30px; box-sizing: border-box;"}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p style={{ fontSize: "20px", fontWeight: Common.fontWeight.bold }}>
              간호사 관리
            </p>
            <Box
              type={"purple03"}
              size={["24px", "24px"]}
              props={"cursor: pointer; font-size: 16px;"}
              onClick={() => {
                OpenModal("Nurse");
              }}
            >
              +
            </Box>
          </div>
          {edit === "간호사 관리" ? (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
              onClick={() => {
                setEdit("");
                onNurseSave();
              }}
            >
              저장
            </Box>
          ) : (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
              onClick={() => {
                setEdit("간호사 관리");
              }}
            >
              편집
            </Box>
          )}
        </div>
        <hr style={{ width: "100%", margin: "20px 0px" }} />
        <div
          style={{
            height: "500px",
            overflow: "auto",
            width: "100%",
          }}
        >
          {nurses?.map((item, i) => {
            return (
              <AdminManagementItem
                wards={wards}
                type={"employee"}
                item={item}
                key={i}
                edit={edit}
                nurses={nurses}
                setNurses={setNurses}
              />
            );
          })}
        </div>
      </Box>

      {/* 장비 관리 */}
      <Box
        type={"white"}
        size={["430px", "540px"]}
        flex={["flex-start", "flex-start"]}
        props={"flex-direction: column; padding: 30px; box-sizing: border-box;"}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p style={{ fontSize: "20px", fontWeight: Common.fontWeight.bold }}>
              장비 관리
            </p>
            <Box
              type={"purple03"}
              size={["24px", "24px"]}
              props={"cursor: pointer; font-size: 16px;"}
              onClick={() => {
                OpenModal("equipment");
              }}
            >
              +
            </Box>
          </div>
          {edit === "장비 관리" ? (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
              onClick={() => {
                setEdit("");
              }}
            >
              취소
            </Box>
          ) : (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
              onClick={() => {
                setEdit("장비 관리");
              }}
            >
              편집
            </Box>
          )}
        </div>
        <hr style={{ width: "100%", margin: "20px 0px" }} />
        <div
          style={{
            height: "500px",
            overflow: "auto",
            width: "100%",
          }}
        >
          {devices?.map((item, i) => {
            return (
              <AdminManagementItem
                type={"equipment"}
                item={item}
                edit={edit}
                key={i}
                devices={devices}
                setDevices={setDevices}
              />
            );
          })}
        </div>
      </Box>

      {/* 모달창 */}

      {isModal === "Nurse" ? (
        inviteCode ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "#00000039",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={closeInviteModal}
          >
            <Box
              type={"white"}
              size={["500px", "400px"]}
              props={"flex-direction: column; gap: 40px;"}
            >
              <p>초대 코드</p>
              <p>{count}초 후 자동으로 종료됩니다.</p>
              <div style={{ display: "flex", gap: "4px" }}>
                {inviteCode.map((code, i) => (
                  <Box
                    type={"purple01"}
                    size={["40px", "60px"]}
                    key={i}
                  >
                    {code}
                  </Box>
                ))}
              </div>
              <p>해당 코드를 모바일 환경에서 입력해주세요.</p>
            </Box>
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "#00000039",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={closeInviteModal}
          >
            <Box
              type={"white"}
              size={["500px", "400px"]}
              props={"flex-direction: column; gap: 40px;"}
            >
              <p style={{ fontSize: "20px" }}>신규 간호사 초대</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <p style={{ fontSize: "16px" }}>성명 </p>
                <Input
                  variant={"default"}
                  onChange={inputName}
                />
              </div>
              <Box
                type={"purple03"}
                size={["200px", "60px"]}
                props={"cursor: pointer;"}
                onClick={createInviteCode}
              >
                초대코드 생성하기
              </Box>
            </Box>
          </div>
        )
      ) : isModal === "ward" ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#00000039",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={closeInviteModal}
        >
          <Box
            type={"white"}
            size={["500px", "400px"]}
            props={"flex-direction: column; gap: 40px;"}
          >
            ward
          </Box>
        </div>
      ) : isModal === "equipment" ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#00000039",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={closeInviteModal}
        >
          <Box
            type={"white"}
            size={["500px", "400px"]}
            props={"flex-direction: column; gap: 40px;"}
          >
            equipment
          </Box>
        </div>
      ) : null}
    </div>
  );
}
