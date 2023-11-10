import React, { useState } from "react";
import Box from "../../atoms/Box/Box";
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function OffApplyItem({ nurseName, offApply, offkey }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      type={"white"}
      size={["270px"]}
      flex={["flex-start", "flex-start"]}
      props={
        "flex-direction: column; gap: 10px; font-size: 14px; margin-bottom: 14px; box-sizing: border-box; padding: 6px 10px; cursor: pointer;"
      }
      onClick={(e) => {
        setExpanded(!expanded);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "40px",
        }}
      >
        <p>{nurseName && nurseName[0].name} 간호사</p>
        <MdOutlineArrowDropDown
          size={20}
          style={{
            transform: expanded ? "rotate(180deg)" : "",
            transition: "all 0.2s",
          }}
        />
      </div>
      {expanded ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <p>신청 날짜</p>
            {offApply[offkey].map((apply, index) => (
              <p key={index}>{apply.offdate}</p>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <p>사유</p>
            <p>{offkey}</p>
          </div>
        </div>
      ) : null}
    </Box>
  );
}
