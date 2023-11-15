import styled from "@emotion/styled";

export const StyledTextareaContainer = styled.div`
  display: flex;
  width: ${({ width }) => width || "auto"};
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: "3px 3px 6px 4px rgba(208, 191, 255, 0.1)";
  border: "1px solid rgba(208, 191, 255, 0.2)";
  background-color: #ffffff;
  color: #555555;
  ${({ props }) => props}
`;

export const StyledTextarea = styled.textarea`
  line-height: 20px;
  resize: none;
  padding: 14px;
  margin: 16px 14px;
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  color: #555555;
  outline: none;
  border: none;
  padding: 0;
  ${({ style }) => style}
`;
