import React from "react";
import * as S from "./Container.styles";

export default function Container({ children, flex, backgroundColor }) {
  return (
    <S.StyledContainer
      flex={flex}
      backgroundColor={backgroundColor}
    >
      {children}
    </S.StyledContainer>
  );
}
