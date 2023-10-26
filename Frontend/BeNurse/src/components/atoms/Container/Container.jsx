import React from "react";
import * as S from "./Container.styles";

export default function Container({ children, backgroundColor }) {
  return (
    <S.StyledContainer backgroundColor={backgroundColor}>
      {children}
    </S.StyledContainer>
  );
}
