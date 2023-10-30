import React, { useEffect, useState } from "react";
import Container from "../../components/atoms/Container/Container";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function PatientPage() {
  const [patientBgColor, setPatientBgColor] = useState("purple");
  const path = useLocation().pathname;

  useEffect(() => {
    if (path.startsWith("/patient/detail")) {
      setPatientBgColor("white");
    } else {
      setPatientBgColor("purple");
    }
  }, [path]);

  return (
    <Container
      backgroundColor={patientBgColor}
      flex={["center", "flex-start"]}
    >
      <Outlet />
    </Container>
  );
}
