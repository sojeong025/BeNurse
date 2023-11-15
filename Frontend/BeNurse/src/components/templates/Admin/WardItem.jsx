import React, { useState } from "react";
import { Common } from "../../../utils/global.styles";
import { RiPencilFill } from "react-icons/ri";
import { IoTrash } from "react-icons/io5";
import trashcan from "@assets/Images/trashcan.png";
import { customAxios } from "../../../libs/axios";

import Box from "@components/atoms/Box/Box";
import Input from "@components/atoms/Input/Input";

export default function WardItem({ item, edit, wards, setWards }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentWard, setCurrentWard] = useState(item);

  const inputName = (e) => {
    setCurrentWard({ ...currentWard, name: e.target.value });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "60px",
          borderBottom: "1px solid #cccccc",
          paddingLeft: "20px",
          boxSizing: "border-box",
          transition: "all 0.2s",
          fontSize: "14px",
        }}
      >
        <p>{item.name}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "11px",
          }}
        >
          <div
            onClick={() => {
              setIsModalOpen(true);
              setCurrentWard(item);
            }}
            style={{
              cursor: "pointer",
              width: "50px",
              height: "22px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: Common.color.purple03,
              color: "#ffffff",
            }}
          >
            수정
          </div>
          <div
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            style={{
              cursor: "pointer",
              width: "50px",
              height: "22px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "#6c757d",
              color: "#ffffff",
            }}
          >
            삭제
          </div>
        </div>
      </div>
      {isModalOpen && (
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
              setIsModalOpen(false);
              setCurrentWard(item);
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
                value={currentWard.name}
                onChange={inputName}
              />
            </div>
            <Box
              type={"purple03"}
              size={["200px", "60px"]}
              props={"cursor: pointer;"}
              onClick={() => {
                customAxios
                  .put("ward", {
                    name: currentWard.name,
                    id: currentWard.id,
                  })
                  .then((res) => {
                    console.log("병동 수정 완료", res);
                    setWards(
                      wards.map((ward) =>
                        ward.id === item.id
                          ? {
                              ...ward,
                              id: currentWard.id,
                              name: currentWard.name,
                            }
                          : ward,
                      ),
                    );
                  })
                  .catch((error) => {
                    console.error("병동 수정 실패", error);
                  });
                setIsModalOpen(false);
              }}
            >
              저장하기
            </Box>
          </Box>
        </div>
      )}
      {isDeleteModalOpen && (
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
              setIsDeleteModalOpen(false);
            }
          }}
        >
          <Box
            type={"white"}
            size={["600px", "400px"]}
            props={"flex-direction: column; gap: 40px;"}
          >
            <img
              src={trashcan}
              width="80px"
            />
            <p>정말 {item.name} 병동을 병원 DB에서 삭제하시겠습니까?</p>
            <Box
              type={"purple03"}
              size={["200px", "60px"]}
              props={"cursor: pointer;"}
              onClick={() => {
                customAxios
                  .delete("/ward", { data: { id: item.id } })
                  .then((res) => {
                    console.log("병동 삭제 완료", res);
                    setWards(wards.filter((ward) => ward.id !== item.id));
                    setIsDeleteModalOpen(false);
                  })
                  .catch((error) => {
                    console.error("병동 삭제 실패", error);
                  });
              }}
            >
              삭제하기
            </Box>
          </Box>
        </div>
      )}
    </>
  );
}
