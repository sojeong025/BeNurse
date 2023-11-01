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
  padding,
  font,
  overflow,
  overflowX,
  overflowY,
  props,
}) {
  return (
    <S.StyledBox
      flex={flex}
      type={type}
      size={size}
      border={border}
      margin={margin}
      padding={padding}
      font={font}
      overflow={overflow}
      overflowX={overflowX}
      overflowY={overflowY}
      props={props}
    >
      {children}
    </S.StyledBox>
  );
}
