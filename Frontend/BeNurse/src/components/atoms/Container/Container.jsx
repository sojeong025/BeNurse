import React from "react";
import * as S from "./Container.styles";

export default function Container({
  children,
  flex,
  backgroundColor,
  overflow,
}) {
  return (
    <S.StyledContainer
      flex={flex}
      backgroundColor={backgroundColor}
      overflow={overflow}
    >
      {children}
    </S.StyledContainer>
  );
}
