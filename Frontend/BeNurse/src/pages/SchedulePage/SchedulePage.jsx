import React, { useEffect } from "react";
import ScheduleCalendar from "@components/templates/Schedule/ScheduleCalendar";
import Container from "@components/atoms/Container/Container";
import { useTabBarStore } from "../../store/store";

export default function SchedulePage() {
  const { currentTab, setCurrentTab } = useTabBarStore((state) => state);

  useEffect(() => {
    setCurrentTab("schedule");
  }, []);

  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <div style={{ marginTop: "74px" }}>
        <ScheduleCalendar />
      </div>
    </Container>
  );
}
