import React, { useEffect, useState } from "react";
import Container from "@components/atoms/Container/Container";
import { useOffDateStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Button from "@components/atoms/Button/Button";
import { Common } from "../../utils/global.styles";
import { customAxios } from "../../libs/axios";

export default function OffwritePage() {
  const { selectedDates } = useOffDateStore();

  console.log("data형식파악", selectedDates);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      date: selectedDates,
      content: content,
    };
    await customAxios.post("Offschedule", data).then((res) => {
      console.log("보내기 성공", res);
      navigate("/off-application-finish");
    });
  };

  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <div style={{ marginTop: "118px" }}>
        <div style={{ width: "384px" }}>
          <div style={{ margin: "0px 14px" }}>
            <div
              style={{
                fontSize: Common.fontSize.fontL,
                fontWeight: Common.fontWeight.bold,
                marginBottom: "10px",
              }}
            >
              신청 사유 작성
            </div>

            <div
              style={{ marginBottom: "10px", fontSize: Common.fontSize.fontS }}
            >
              ◾ 신청 날짜 :
              {Array.isArray(selectedDates) &&
                selectedDates
                  .sort((a, b) => new Date(a) - new Date(b))
                  .map((date) => `${date.split("-")[2]}일`)
                  .join(", ")}
            </div>

            <textarea
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: "330px",
                height: "200px",
                boxShadow: "3px 3px 6px 4px rgba(208, 191, 255, 0.1)",
                border: "1px solid rgba(208, 191, 255, 0.2)",
                resize: "none",
                fontSize: Common.fontSize.fontM,
                outline: "none",
                borderRadius: "10px",
                margin: "10px 0 20px",
                padding: "14px",
              }}
            />
            <div
              style={{
                fontSize: Common.fontSize.fontS,
                lineHeight: "24px",
                marginBottom: "30px",
              }}
            >
              ⚠️ 신청하기 버튼을 누르면{" "}
              <span
                style={{
                  color: Common.color.danger,
                  fontWeight: Common.fontWeight.bold,
                }}
              >
                수정 및 삭제
              </span>
              는 불가합니다.
              <br /> ⏳ 수간호사의 승인을 받아야 확정되며, 모든 신청이
              자동적으로 승인되는 것은 아닙니다.
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "720px",
            }}
            onClick={handleSubmit}
          >
            <Button
              variant="primary"
              width="384px"
              radius="16px"
              style={{ marginBottom: "10px" }}
            >
              신청하기
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
