import React from "react";
import Container from "@components/atoms/Container/Container";
import OffCalendar from "@components/templates/Schedule/OffCalendar";
import Button from "@components/atoms/Button/Button";

export default function OffApplicationPage() {
  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <div
        style={{
          marginTop: "88px",
        }}
      >
        <OffCalendar />
        <Button
          variant="primary"
          width="384px"
          radius="16px"
          style={{ marginBottom: "10px" }}
        >
          신청하기
        </Button>
      </div>
    </Container>
  );
}
