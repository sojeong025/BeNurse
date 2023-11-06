import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Common } from "../../utils/global.styles";
import { customAxios } from "../../libs/axios";

// Components
import Box from "../../components/atoms/Box/Box";
import Input from "@components/atoms/Input/Input";

// Icons
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

// Images
import Hospital from "@assets/Images/join_hospital.png";
import Nurse from "@assets/Images/join_nurse.png";
import Complete from "@assets/Images/send.png";

export default function AdminSelectRolePage() {
  const [modalOn, setModalOn] = useState(false);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [emr, setEmr] = useState("");
  const [address, setAddress] = useState("");
  const [popUp, setPopUp] = useState(false);

  const navigate = useNavigate();
  const openModal = () => {
    setModalOn(true);
  };
  const navigateMain = () => {
    navigate("../main");
  };

  const createHospital = () => {
    const newHospital = {
      address,
      emr,
      name,
      tel,
    };
    customAxios.post("Hospital", newHospital).then((res) => {
      if (res.status === 200) {
        setPopUp(true);
      }
    });
  };

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
        backgroundColor: Common.color.purple00,
        gap: "60px",
      }}
    >
      <Box
        type={"white"}
        size={["300px", "360px"]}
        props={"cursor: pointer;"}
        onClick={openModal}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
            fontSize: Common.fontSize.fontL,
          }}
        >
          <img
            style={{ width: "160px" }}
            src={Hospital}
            alt=""
          />
          <div>
            <p style={{ fontSize: "16px" }}>
              병원을 등록하려는 관리자이신가요?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "14px",
                color: Common.color.purple03,
                fontSize: "20px",
                fontWeight: Common.fontWeight.bold,
                gap: "6px",
              }}
            >
              <BsFillArrowRightCircleFill size={26} />
              <p>병원 등록하기</p>
            </div>
          </div>
        </div>
      </Box>
      <Box
        type={"purple03"}
        size={["300px", "360px"]}
        props={"cursor: pointer;"}
        onClick={navigateMain}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
            fontSize: Common.fontSize.fontL,
          }}
        >
          <img
            style={{ width: "160px" }}
            src={Nurse}
            alt=""
          />
          <div>
            <p style={{ fontSize: "16px" }}>
              이미 등록된 병원의 간호사이신가요?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: Common.fontWeight.bold,
                marginTop: "14px",
                gap: "6px",
              }}
            >
              <BsFillArrowRightCircleFill size={26} />
              <p>간호사로 가입하기</p>
            </div>
          </div>
        </div>
      </Box>
      {modalOn && (
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
        >
          <div
            style={{
              boxSizing: "border-box",
              width: "800px",
              height: "500px",
              padding: "40px",
              backgroundColor: "#fff",
              borderRadius: "30px",
              fontSize: "18px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{ fontSize: "22px", fontWeight: Common.fontWeight.bold }}
              >
                병원 등록하기
              </p>
              <IoClose
                style={{ cursor: "pointer" }}
                size={28}
                onClick={() => {
                  setModalOn(false);
                }}
              />
            </div>
            <hr style={{ margin: "20px 0px" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <p>병원명</p>
              <Input
                type="text"
                width={"500px"}
                variant={"default"}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <p>병원 연락처</p>
              <Input
                type="text"
                width={"500px"}
                variant={"default"}
                onChange={(e) => {
                  setTel(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <p>EMR 링크</p>
              <Input
                type="text"
                width={"500px"}
                variant={"default"}
                onChange={(e) => {
                  setEmr(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "40px",
              }}
            >
              <p>병원 주소</p>
              <Input
                type="text"
                width={"500px"}
                variant={"default"}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "30px",
                justifyContent: "flex-end",
              }}
            >
              <Box
                type={"purple03"}
                size={["160px", "60px"]}
                props={"cursor: pointer;"}
                onClick={createHospital}
              >
                등록하기
              </Box>
            </div>
          </div>
        </div>
      )}
      {popUp && (
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
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "360px",
              height: "310px",
              padding: "30px",
              backgroundColor: "#fff",
              borderRadius: "30px",
              boxSizing: "border-box",
              fontSize: "18px",
            }}
          >
            <img
              style={{
                width: "112px",
                marginBottom: "50px",
                transition: "all 1s",
                transform: "rotateY(360deg)",
              }}
              src={Complete}
              alt=""
            />
            <p style={{ marginBottom: "30px" }}>병원 등록이 완료되었습니다!</p>
            <Box
              type={"purple03"}
              size={["40%", "40px"]}
              props={"cursor: pointer;"}
              onClick={navigateMain}
            >
              확인
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}
