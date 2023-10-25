import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styles";

export default function Button({ children, variant, width, ...props }) {
  return (
    <S.StyledButton
      variant={variant}
      width={width}
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
