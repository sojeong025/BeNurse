import React from "react";
import { Common } from "../../../utils/global.styles";

// emotions
import Box from "../../atoms/Box/Box";

// Icons
import { MdKeyboardArrowRight } from "react-icons/md";

//Images
import temp from "@assets/Images/temp.png";

export default function DeviceItem() {
  return (
    <Box
      type={"white"}
      margin={"0px 0px 20px 0px"}
      size={["384px", "132px"]}
      font={"16px"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "334px",
          height: "82px",
        }}
      >
        <div
          style={{
            width: "82px",
            height: "82px",
            border: `1px solid ${Common.color.purple01}`,
            borderRadius: "10px",
            objectFit: "contain",
          }}
        >
          <img
            style={{ borderRadius: "10px" }}
            src={temp}
            alt=""
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "232px",
            height: "72px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "72px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: Common.fontSize.fontL,
                  fontWeight: Common.fontWeight.extrabold,
                }}
              >
                INFUSION PUMP
              </span>
              <div>
                <span style={{ fontSize: Common.fontSize.fontXS }}>
                  ID: ED1390FA2
                </span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <span
                  style={{
                    fontSize: Common.fontSize.fontS,
                    fontWeight: Common.fontWeight.bold,
                  }}
                >
                  현재위치{" "}
                </span>
                <span style={{ fontSize: Common.fontSize.fontS }}>
                  내과 A동 A101호
                </span>
              </div>
            </div>
          </div>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30px",
              height: "30px",
              border: "none",
              borderRadius: "30px",
              backgroundColor: Common.color.purple01,
            }}
          >
            <MdKeyboardArrowRight
              size={24}
              color={Common.color.purple04}
            />
          </button>
        </div>
      </div>
    </Box>
  );
}
