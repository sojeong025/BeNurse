import React from "react";
import Box from "../Box/Box";
import * as S from "./Drawer.styles";

export default function Drawer() {
  return (
    <S.StyledDrawer>
      <div
        style={{
          width: "100px",
          height: "10px",
          borderRadius: "30px",
          backgroundColor: "black",
        }}
      />
      <Box
        type={"transparent"}
        size={["412px", "100px"]}
        border={true}
      ></Box>
    </S.StyledDrawer>
  );
}
