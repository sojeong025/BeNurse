import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Common } from "../../utils/global.styles";
import NotFound from "@assets/Images/not_found.png";
import Box from "../../components/atoms/Box/Box";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate(""), 2000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
        backgroundColor: Common.color.purple00,
      }}
    >
      <img
        style={{ width: "404px", transform: "rotate(11.5deg)" }}
        src={NotFound}
        alt=""
      />
    </div>
  );
}
