import React from "react";
import Box from "../../components/atoms/Box/Box";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Hospital from "@assets/Images/join_hospital.png";
import Nurse from "@assets/Images/join_nurse.png";

export default function AdminSelectRolePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
        gap: "60px",
      }}
    >
      <Box
        type={"white"}
        size={["400px", "240px"]}
        props={"cursor: pointer;"}
      >
        <div>
          <img
            style={{ width: "100px" }}
            src={Hospital}
            alt=""
          />
          <p>병원을 등록하려는 관리자이신가요?</p>
          <div>
            <BsFillArrowRightCircleFill />
            <p>병원 등록하기</p>
          </div>
        </div>
      </Box>
      <Box
        type={"purple03"}
        size={["400px", "240px"]}
        props={"cursor: pointer;"}
      >
        <div>
          <img
            style={{ width: "100px" }}
            src={Nurse}
            alt=""
          />

          <p>이미 등록된 병원의 간호사이신가요?</p>
          <div>
            <BsFillArrowRightCircleFill />
            <p>간호사로 가입하기</p>
          </div>
        </div>
      </Box>
    </div>
  );
}
