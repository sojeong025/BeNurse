import styled from "@emotion/styled";

const variants = {
  default: {
    boxShadow: "3px 3px 6px 4px rgba(208, 191, 255, 0.1)",
    border: "1px solid rgba(208, 191, 255, 0.2)",
  },
  search: {
    boxShadow: "3px 3px 6px 4px rgba(191, 191, 191, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  },
};

export const StyledInput = styled.input`
  width: ${({ width }) => width || "auto"};
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  height: 50px;
  box-shadow: ${({ variant }) => variants[variant].boxShadow};
  border: ${({ variant }) => variants[variant].border};
  background-color: #ffffff;
  color: #555555;
  padding: 0 1rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;
