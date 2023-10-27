import React from "react";
import * as S from "./Box.styles";

export default function Box({ children, size, type, border, margin, font }) {
  return (
    <S.StyledBox
      type={type}
      size={size}
      border={border}
      margin={margin}
      font={font}
    >
      {children}
    </S.StyledBox>
  );
}
