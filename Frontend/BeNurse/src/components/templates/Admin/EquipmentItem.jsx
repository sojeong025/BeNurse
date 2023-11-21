import React, { useState } from "react";
import { Common } from "../../../utils/global.styles";
import trashcan from "@assets/Images/trashcan.png";
import { customAxios } from "../../../libs/axios";

import Box from "@components/atoms/Box/Box";
import Input from "@components/atoms/Input/Input";

export default function EquipmentItem({ item, devices, setDevices }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [equipment, setEquipment] = useState(item);

  const inputName = (e) => {
    setEquipment({ ...equipment, name: e.target.value });
  };

  const inputAsTel = (e) => {
    setEquipment({ ...equipment, asTel: e.target.value });
  };

  const deleteEquipment = () => {
    customAxios.delete("nfc?ID=" + item.id);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
          height: "80px",
          transition: "all 0.2s",
          fontSize: "13px",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #cccccc",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src={item.img}
            width="70px"
            height="60px"
            style={{ marginRight: "10px", objectFit: "contain" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{item.name}</div>
            <div style={{ fontSize: "10px" }}>ID: {item.id}</div>
          </div>
        </div>

        <div
          style={{
            fontSize: "11px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div>
            <span style={{ fontWeight: Common.fontWeight.bold }}>A/S</span>{" "}
            {item.asTel}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              onClick={() => {
                setIsModalOpen(true);
                setEquipment(item);
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
              <div>수정</div>
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
              <div>삭제</div>
            </div>
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
              setEquipment(item);
            }
          }}
        >
          <Box
            type={"white"}
            size={["600px", "400px"]}
            props={"flex-direction: column; gap: 30px;"}
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
                justifyContent: "center",
              }}
            >
              <img
                src={equipment.img}
                width="180px"
                style={{ objectFit: "cover", marginRight: "20px" }}
              />
              <div>
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <p
                      style={{
                        fontSize: `${Common.fontSize.fontS}`,
                        marginBottom: "10px",
                        width: "250px",
                        fontWeight: `${Common.fontWeight.bold}`,
                      }}
                    >
                      장비명
                    </p>
                    <Input
                      variant={"default"}
                      value={equipment.name}
                      onChange={inputName}
                      width="250px"
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: `${Common.fontSize.fontS}`,
                        marginBottom: "10px",
                        fontWeight: `${Common.fontWeight.bold}`,
                        width: "250px",
                      }}
                    >
                      A/S 연락처
                    </p>
                    <Input
                      variant={"default"}
                      value={equipment.asTel}
                      onChange={inputAsTel}
                      width="250px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Box
              type={"purple03"}
              size={["200px", "50px"]}
              props={"cursor: pointer;"}
              onClick={() => {
                customAxios
                  .put("device", equipment)
                  .then((res) => {
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
              size={["200px", "50px"]}
              props={"cursor: pointer;"}
              onClick={() => {
                deleteEquipment();
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
