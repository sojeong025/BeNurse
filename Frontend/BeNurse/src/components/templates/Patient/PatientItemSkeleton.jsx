import React from "react";
import Box from "@components/atoms/Box/Box";
import { Skeleton } from "antd";

export default function PatientItemSkeleton() {
  return (
    <Box
      type={"white"}
      size={["102px", "140px"]}
      padding={"14px 10px"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "140px",
        }}
      >
        <>
          <Skeleton.Button
            active
            style={{ width: "10px", height: "15px" }}
          />

          <Skeleton.Button
            active
            style={{ width: "20px", height: "20px" }}
          />
          <Skeleton.Button
            active
            style={{ width: "10px", height: "20px" }}
          />
        </>
      </div>
    </Box>
  );
}
