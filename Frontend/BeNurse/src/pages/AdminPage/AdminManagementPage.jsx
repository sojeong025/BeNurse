import React, { useState } from "react";
import { Common } from "../../utils/global.styles";
import Box from "../../components/atoms/Box/Box";
import AdminManagementItem from "../../components/templates/Admin/AdminManagementItem";

export default function AdminManagementPage() {
  const [edit, setEdit] = useState("");
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
              props={"cursor: pointer; font-size: 12px;"}
            >
              +
            </Box>
          </div>
          {edit === "병동 관리" ? (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
            >
              저장
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
        <AdminManagementItem type={"ward"} />
      </Box>
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
              직원 관리
            </p>
            <Box
              type={"purple03"}
              size={["24px", "24px"]}
              props={"cursor: pointer; font-size: 12px;"}
            >
              +
            </Box>
          </div>
          {edit === "직원 관리" ? (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
            >
              저장
            </Box>
          ) : (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
              onClick={() => {
                setEdit("직원 관리");
              }}
            >
              편집
            </Box>
          )}
        </div>
        <hr style={{ width: "100%", margin: "20px 0px" }} />
        <AdminManagementItem type={"employee"} />
      </Box>
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
              props={"cursor: pointer; font-size: 12px;"}
            >
              +
            </Box>
          </div>
          {edit === "장비 관리" ? (
            <Box
              type={"purple03"}
              size={["70px", "30px"]}
              props={"cursor: pointer; font-size: 12px;"}
            >
              저장
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
        <AdminManagementItem type={"equipment"} />
      </Box>
    </div>
  );
}
