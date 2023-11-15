import React, { useState, useEffect } from "react";
import { Common } from "../../utils/global.styles";
import Box from "../../components/atoms/Box/Box";
import Input from "@components/atoms/Input/Input";
import { FaFileCirclePlus } from "react-icons/fa6";
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
  const [currentWard, setCurrentWard] = useState({});
  const [showWardForm, setShowWardForm] = useState(false);
  const [inviteCode, setInviteCode] = useState(null);
  const { isComplete, setIsComplete } = useInviteStore((state) => state);
  const { isModal, OpenModal, CloseModal } = useModalStore((state) => state);

  const inputName = (e) => {
    setNurseName(e.target.value);
  };

  const inputWardName = (e) => {
    setCurrentWard({ name: e.target.value });
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

  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [asTel, setAsTel] = useState("");
  const [info, setInfo] = useState("");
  const [img, setImg] = useState(null);

  const handleIDChange = (e) => {
    setID(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAsTelChange = (e) => {
    setAsTel(e.target.value);
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleAddDevice = () => {
    const formData = new FormData();
    formData.append("ID", ID);
    formData.append("name", name);
    formData.append("asTel", asTel);
    formData.append("file", img);
    function telValidator(args) {
      if (/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(args)) {
        return true;
      }
      return false;
    }

    if (telValidator(asTel)) {
      customAxios
        .post("device", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          URL.revokeObjectURL(img);
          CloseModal();
          customAxios.get("device/all").then((res) => {
            setDevices(res.data.responseData);
          });
          setID(null);
          setName(null);
          setAsTel(null);
          setImg(null);
        });
    } else {
      alert("전화번호가 바르지 않습니다.");
    }
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
      setImg(null);
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
  }, [isModal]);

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
        </div>
        <hr style={{ width: "100%", margin: "26px 0px 10px 0px" }} />
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
        <hr style={{ width: "100%", margin: "20px 0px 10px 0px" }} />
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
        </div>
        <hr style={{ width: "100%", margin: "26px 0px 10px 0px" }} />
        <div
          style={{
            height: "500px",
            overflow: "auto",
            width: "100%",
          }}
        >
          {devices?.map((item, i) => {
            console.log(devices);
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
                    size={["40px", "50px"]}
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
                size={["200px", "50px"]}
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
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              CloseModal();
              setCurrentWard({});
            }
          }}
        >
          <Box
            type={"white"}
            size={["600px", "400px"]}
            props={"flex-direction: column; gap: 40px;"}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <p
                style={{
                  fontSize: `${Common.fontSize.fontM}`,
                  fontWeight: `${Common.fontWeight.bold}`,
                }}
              >
                병동명
              </p>
              <Input
                width="300px"
                variant={"default"}
                onChange={inputWardName}
              />
            </div>
            <Box
              type={"purple03"}
              size={["200px", "50px"]}
              props={"cursor: pointer;"}
              onClick={() => {
                customAxios
                  .post("/ward", currentWard)
                  .then((res) => {
                    console.log("병동 등록 성공", res);
                    setWards([...wards, currentWard]);
                    CloseModal();
                  })
                  .catch((error) => {
                    console.error("병동 등록 실패", error);
                  });
              }}
            >
              등록하기
            </Box>
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
            props={"flex-direction: column; gap: 20px;"}
          >
            <p style={{ fontSize: "20px", margin: "10px 0px" }}>
              장비 추가하기
            </p>
            <div
              style={{
                display: "flex",
                width: "400px",
                height: "200px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "140px",
                  height: "140px",
                  maxWidth: "140px",
                  maxHeight: "140px",
                  backgroundColor: "#e7e7e7",
                  borderRadius: "20px",
                  marginLeft: "-20px",
                  marginRight: "20px",
                }}
              >
                {!img && (
                  <>
                    <label
                      for="file"
                      style={{ cursor: "pointer" }}
                    >
                      <FaFileCirclePlus
                        size={44}
                        opacity={0.4}
                      />
                    </label>
                    <input
                      id="file"
                      type="file"
                      name="img"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </>
                )}
                {img && (
                  <img
                    style={{
                      width: "140px",
                      height: "140px",
                      maxWidth: "140px",
                      maxHeight: "140px",
                      borderRadius: "20px",
                      objectFit: "cover",
                    }}
                    onClick={() => {
                      setImg(null);
                    }}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                  />
                )}
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  <p style={{ fontSize: "14px", width: "80px" }}>장비 ID </p>
                  <Input
                    variant={"default"}
                    name="ID"
                    onChange={handleIDChange}
                    width="140px"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: "14px", width: "80px" }}>장비 명 </p>
                  <Input
                    variant={"default"}
                    name="name"
                    onChange={handleNameChange}
                    width="140px"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: "14px", width: "80px" }}>
                    AS 전화번호{" "}
                  </p>
                  <Input
                    variant={"default"}
                    name="asTel"
                    onChange={handleAsTelChange}
                    width="140px"
                  />
                </div>
              </div>
            </div>
            <Box
              type={"purple03"}
              size={["200px", "50px"]}
              props={"cursor: pointer;"}
              onClick={handleAddDevice}
            >
              장비 추가
            </Box>
          </Box>
        </div>
      ) : null}
    </div>
  );
}
