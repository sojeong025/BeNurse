import React, { useState } from "react";
import { Common } from "../../../utils/global.styles";
import device_as from "@assets/Icons/device_as.png";
import trashcan from "@assets/Images/trashcan.png";
import { RiPencilFill } from "react-icons/ri";
import { IoTrash } from "react-icons/io5";
import { customAxios } from "../../../libs/axios";

import Box from "@components/atoms/Box/Box";
import Input from "@components/atoms/Input/Input";

export default function EquipmentItem({ item, edit, devices, setDevices }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [equipment, setEquipment] = useState(item);

  const inputName = (e) => {
    setEquipment({ ...equipment, name: e.target.value });
  };

  const inputAsTel = (e) => {
    setEquipment({ ...equipment, asTel: e.target.value });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
          transition: "all 0.2s",
          fontSize: "13px",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #cccccc",
        }}
      >
        <img
          src={item.img}
          width="60px"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontWeight: "bold" }}>{item.name}</div>
          <div style={{ fontSize: "10px" }}>ID: {item.id}</div>
        </div>

        <div
          style={{
            fontSize: "11px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <img
            src={device_as}
            width="10px"
          />
          <div>{item.asTel}</div>
        </div>

        <div
          onClick={() => {
            setIsModalOpen(true);
            setEquipment(item);
          }}
          style={{
            display: edit === "장비 관리" ? "block" : "none",
            cursor: "pointer",
          }}
        >
          <RiPencilFill fill={Common.color.purple03} />
        </div>
        <div
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
          style={{
            display: edit === "장비 관리" ? "block" : "none",
            cursor: "pointer",
          }}
        >
          <IoTrash fill={Common.color.danger} />
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
              setEquipment(item);
            }
          }}
        >
          <Box
            type={"white"}
            size={["600px", "400px"]}
            props={"flex-direction: column; gap: 40px;"}
          >
            <p
              style={{
                fontSize: `${Common.fontSize.fontM}`,
                fontWeight: `${Common.fontWeight.extrabold}`,
              }}
            >
              ID : {equipment.id}
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <img
                src={equipment.img}
                width="230px"
                style={{ objectFit: "cover" }}
              />
              <div>
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <p
                      style={{
                        fontSize: `${Common.fontSize.fontM}`,
                        marginBottom: "10px",
                        fontWeight: `${Common.fontWeight.bold}`,
                      }}
                    >
                      장비명
                    </p>
                    <Input
                      variant={"default"}
                      value={equipment.name}
                      onChange={inputName}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: `${Common.fontSize.fontM}`,
                        marginBottom: "10px",
                        fontWeight: `${Common.fontWeight.bold}`,
                      }}
                    >
                      A/S 연락처
                    </p>
                    <Input
                      variant={"default"}
                      value={equipment.asTel}
                      onChange={inputAsTel}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Box
              type={"purple03"}
              size={["200px", "60px"]}
              props={"cursor: pointer;"}
              onClick={() => {
                customAxios
                  .put(`/device`, equipment)
                  .then((res) => {
                    console.log("장비 수정 완료", res);
                    setIsModalOpen(false);
                    setDevices(
                      devices.map((device) =>
                        device.id === item.id
                          ? {
                              ...device,
                              name: equipment.name,
                              asTel: equipment.asTel,
                            }
                          : device,
                      ),
                    );
                  })
                  .catch((error) => {
                    console.error("장비 수정 실패", error);
                  });
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
            <p>정말 {item.name}을 병원 DB에서 삭제하시겠습니까?</p>
            <Box
              type={"purple03"}
              size={["200px", "60px"]}
              props={"cursor: pointer;"}
              onClick={() => {
                setDevices(devices.filter((device) => device.id !== item.id));
                setIsDeleteModalOpen(false);
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
