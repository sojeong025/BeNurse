import React from "react";
import ScheduleCalendar from "@components/templates/Schedule/ScheduleCalendar";
import Container from "@components/atoms/Container/Container";

export default function SchedulePage() {
  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <ScheduleCalendar />
    </Container>
  );
}
