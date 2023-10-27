import React from "react";
import Container from "../../components/atoms/Container/Container";

import Patient from "../../components/templates/Patient/Patient";

export default function PatientPage() {
  return (
    <Container
      backgroundColor={"purple"}
      flex={["center", "flex-start"]}
    >
      <Patient />
    </Container>
  );
}
