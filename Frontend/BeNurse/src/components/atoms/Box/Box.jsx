import React from "react";
import * as S from "./Box.styles";

export default function Box({
  children,
  flex,
  size,
  type,
  border,
  margin,
  font,
  overflow,
}) {
  return (
    <S.StyledBox
      flex={flex}
      type={type}
      size={size}
      border={border}
      margin={margin}
      font={font}
      overflow={overflow}
    >
      {children}
    </S.StyledBox>
  );
}
