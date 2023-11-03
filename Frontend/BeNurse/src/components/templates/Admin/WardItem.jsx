import React, { useState } from "react";

export default function WardItem({ name }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: expanded ? "300px" : "60px",
        border: "1px solid red",
        padding: "20px",
        boxSizing: "border-box",
        transition: "all 0.2s",
      }}
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      <p>{name}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
          opacity: expanded ? "1" : "0",
          transition: "all 0.2s",
        }}
      >
        <p>{name} 1병동</p>
        <p>{name} 2병동</p>
        <p>{name} 3병동</p>
        <p>{name} 4병동</p>
      </div>
    </div>
  );
}
