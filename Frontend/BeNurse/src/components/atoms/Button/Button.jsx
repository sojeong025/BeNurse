import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styles";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "danger",
    "disabled",
  ]),
  width: PropTypes.string,
};

Button.defaultProps = {
  variant: "default",
};

export default function Button({
  children,
  variant,
  width,
  height,
  radius,
  margin,
  ...props
}) {
  return (
    <S.StyledButton
      variant={variant}
      width={width}
      height={height}
      radius={radius}
      margin={margin}
      {...props}
    >
      {children}
    </S.StyledButton>
  );
}
