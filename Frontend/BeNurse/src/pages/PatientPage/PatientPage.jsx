import React from "react";
import Container from "../../components/atoms/Container/Container";
import Box from "../../components/atoms/Box/Box";
import Input from "../../components/atoms/Input/Input";
import { Common } from "../../utils/global.styles";

export default function PatientPage() {
  return (
    <Container
      backgroundColor={"purple"}
      flex={["center", "flex-start"]}
    >
      <div
        style={{
          width: "386px",
          marginTop: "88px",
        }}
      >
        <div>
          <div style={{ marginBottom: "20px" }}>
            <span
              style={{
                color: Common.color.black02,
                fontSize: Common.fontSize.fontXL,
                fontWeight: Common.fontWeight.extrabold,
              }}
            >
              내과 3동 B302
            </span>
          </div>
          <Input
            variant={"search"}
            placeholder={"병실/환자 이름으로 검색"}
          />
        </div>
        <Box
          type={"white"}
          size={["384px", "557px"]}
          margin={"20px 0px 0px 0px"}
        ></Box>
      </div>
    </Container>
  );
}
