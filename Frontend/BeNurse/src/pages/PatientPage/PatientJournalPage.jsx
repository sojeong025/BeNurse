import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router";
import moment from "moment";

import PatientJournalMain from "./PatientJournalMain";

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
