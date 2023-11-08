import React from "react";
import Container from "@components/atoms/Container/Container";
import HandOverList from "@components/templates/HandOver/HandOverList";

export default function TemporaryListPage() {
  return (
    <Container>
      <div style={{ width: "100%", marginTop: "100px" }}>
        <HandOverList linkto="write" />
      </div>
    </Container>
  );
}
