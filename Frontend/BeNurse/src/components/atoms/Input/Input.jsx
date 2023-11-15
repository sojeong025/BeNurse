import React from "react";
import { StyledInputContainer, StyledInput, IconWrapper } from "./Input.styles";
import { BiSearch } from "react-icons/bi";

export default function Input({
  placeholder,
  width,
  variant,
  onFocus,
  onChange,
  props,
  value,
}) {
  return (
    <StyledInputContainer
      type="text"
      width={width}
      variant={variant}
      props={props}
    >
      {variant === "search" && (
        <IconWrapper>
          <BiSearch
            size={26}
            color="#555555"
          />
        </IconWrapper>
      )}
      <StyledInput
        type="text"
        placeholder={placeholder}
        width={width}
        variant={variant}
        onFocus={onFocus}
        onChange={onChange}
        props={props}
        value={value}
      />
    </StyledInputContainer>
  );
}
