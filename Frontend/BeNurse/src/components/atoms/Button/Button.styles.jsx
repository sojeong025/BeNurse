import styled from "@emotion/styled";

const variants = {
  default: {
    background: "#ffffff",
    color: "#6647D6",
    boxShadow: "3px 3px 6px 4px rgba(187, 187, 187, 0.20)",
  },
  primary: {
    background: "linear-gradient(295deg, #6b4ae3 18.72%, #7f45ff 62.63%)",
    color: "#ffffff",
    boxShadow: "3px 3px 6px 1px rgba(102, 71, 214, 0.20)",
  },
  secondary: {
    background: "linear-gradient(272deg, #D0BFFF 14.45%, #cebbfd 34.61%)",
    color: "#6647D6",
    boxShadow: "3px 3px 6px 1px rgba(150, 105, 249, 0.20)",
  },
};

export const StyledButton = styled.button`
  width: ${({ width }) => width || "auto"};
  font-size: 18px;
  transition: all 0.5s ease-in-out;
  height: 50px;
  cursor: pointer;
  border: none;
  border-radius: 16px;
  box-shadow: 3px 3px 6px 1px rgba(102, 71, 214, 0.2);
  padding: 0 1rem;
  background: ${({ variant }) => variants[variant].background};
  color: ${({ variant }) => variants[variant].color};
`;
