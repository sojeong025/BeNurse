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

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: ${({ width }) => width || "auto"};
  font-size: 16px;
  cursor: pointer;
  height: 50px;
  border-radius: 10px;
  box-shadow: ${({ variant }) => variants[variant].boxShadow};
  border: ${({ variant }) => variants[variant].border};
  background-color: #ffffff;
  color: #555555;
  padding: 0 14px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const StyledInput = styled.input`
  display: flex;
  align-items: center;
  width: calc(100% - 30px);
  font-size: 16px;
  cursor: pointer;
  height: 50px;
  color: #555555;
  outline: none;
  border: none;
  padding: 0;
`;
