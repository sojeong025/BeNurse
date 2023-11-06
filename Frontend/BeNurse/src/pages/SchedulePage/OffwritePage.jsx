import React from "react";
import Container from "@components/atoms/Container/Container";
import { useOffDateStore } from "../../store/store";
import { NavLink } from "react-router-dom";
import Button from "@components/atoms/Button/Button";

export default function OffwritePage() {
  const { selectedDates } = useOffDateStore();

  console.log(selectedDates);

  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <div style={{ marginTop: "88px" }}>
        선택된 날짜:
        {Array.isArray(selectedDates) &&
          selectedDates.map((date, index) => <div key={index}>{date}</div>)}
        <NavLink to="/off-application-finish">
          <Button
            variant="primary"
            width="384px"
            radius="16px"
            style={{ marginBottom: "10px" }}
          >
            신청하기
          </Button>
        </NavLink>
      </div>
    </Container>
  );
}
