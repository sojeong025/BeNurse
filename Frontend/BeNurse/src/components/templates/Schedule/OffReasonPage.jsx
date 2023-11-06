import React from "react";

export default function OffReasonPage() {
  return (
    <div>
      <NavLink to="/off-application-finish">
        <Button
          variant="primary"
          width="384px"
          radius="16px"
          style={{ marginBottom: "10px" }}
        >
          신청하기
        </Button>
      </NavLink>
    </div>
  );
}
