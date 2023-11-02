import React from "react";
import Container from "../../atoms/Container/Container";
import PatientListPage from "../../../pages/PatientPage/PatientListPage";

export default function HandOverPatientList() {
  return (
    <Container
      backgroundColor={"purple"}
      flex={["center", "flex-start"]}
    >
      <PatientListPage />
    </Container>
  );
}
