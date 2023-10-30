import React from "react";
import * as S from "./Box.styles";

export default function Box({
  children,
  position,
  flex,
  size,
  type,
  border,
  margin,
  font,
  overflow,
  overflowX,
  overflowY,
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
      overflowX={overflowX}
      overflowY={overflowY}
    >
      {children}
    </S.StyledBox>
  );
}
