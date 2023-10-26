import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styles";

export default function Button({ children, variant, width, radius, margin, ...props }) {
  return (
    <S.StyledButton
      variant={variant}
      width={width}
      radius={radius}
      margin={margin}
      {...props}
    >
      {children}
    </S.StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "primary", "secondary"]),
  width: PropTypes.string,
};

Button.defaultProps = {
  variant: "default",
};
