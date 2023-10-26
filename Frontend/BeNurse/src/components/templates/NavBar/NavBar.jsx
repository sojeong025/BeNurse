import React from "react";

export default function NavBar() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "412px",
        height: "64px",
        padding: "0px 0px 10px 0px",
        backgroundColor: "#fff",
      }}
    >
      <span>장비 관리</span>
    </div>
  );
}
