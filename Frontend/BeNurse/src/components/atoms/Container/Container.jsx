import React from "react";
import * as S from "./Container.styles";

export default function Container({
  children,
  flex,
  backgroundColor,
  overflow,
  props,
}) {
  return (
    <S.StyledContainer
      flex={flex}
      backgroundColor={backgroundColor}
      overflow={overflow}
      props={props}
    >
      {children}
    </S.StyledContainer>
  );
}
