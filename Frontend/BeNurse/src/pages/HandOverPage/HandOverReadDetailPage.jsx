import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "@components/atoms/Container/Container";
import * as S from "./HandOverReadPage.styles";

import { customAxios } from "../../libs/axios";

export default function HandOverReadDetailPage() {
  const { handoversetId, patientID } = useParams();

  const [handoverDetails, setHandoverDetails] = useState([]);

  useEffect(() => {
    customAxios
      .get("HandoverSet/details", {
        params: {
          ID: handoversetId,
          patientID: patientID,
        },
      })
      .then((res) => {
        console.log("인계장 detail 요청", res);
        setHandoverDetails(res.data.responseData);
      });
  }, [handoversetId]);

  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <div style={{ marginTop: "84px", paddingTop: "24px" }}>
        <S.HandoverList>인계장 목록</S.HandoverList>
        {handoverDetails.map((item, index) => (
          <div style={{ border: "1px solid black" }}>
            <p>CC: {item.cc.join(", ")}</p>
            <p>Etc: {item.etc.join(", ")}</p>
            <p>ID: {item.id}</p>
            <p>Patient ID: {item.patientID}</p>
            <p>Special: {item.special.join(", ")}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
