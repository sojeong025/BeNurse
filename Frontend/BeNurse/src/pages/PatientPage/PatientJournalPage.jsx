import React from "react";
import { Outlet } from "react-router";

// Components
import Container from "../../components/atoms/Container/Container";
const PatientJournalPage = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default PatientJournalPage;
