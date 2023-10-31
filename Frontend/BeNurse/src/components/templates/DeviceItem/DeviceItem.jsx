import React from "react";
import { Common } from "../../../utils/global.styles";

// emotions
import Box from "../../atoms/Box/Box";

// Icons
import { MdKeyboardArrowRight } from "react-icons/md";

//Images
import temp from "@assets/Images/temp.png";

export default function DeviceItem({ id }) {
  return (
    <Box
      type={id ? "transparent" : "white"}
      margin={id ? "0px 0px 0px 0px" : "0px 0px 14px 0px"}
      padding={"20px"}
      size={id ? ["372px", "82px"] : ["348px", "82px"]}
      font={"16px"}
      flex={["flex-start", "center"]}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "334px",
          height: "82px",
        }}
      >
        <img
          style={{
            height: "82px",
            border: `1px solid ${Common.color.purple01}`,
            borderRadius: "10px",
          }}
          src={temp}
          alt=""
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "14px",
            gap: "8px",
          }}
        >
          {true ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: Common.fontSize.fontXS,
                fontWeight: Common.fontWeight.bold,
                width: "50px",
                height: "22px",
                borderRadius: "30px",
                backgroundColor: "rgba(255, 229, 229, 1)",
                color: "#D96363",
              }}
            >
              사용중
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: Common.fontSize.fontXS,
                fontWeight: Common.fontWeight.bold,
                width: "58px",
                height: "22px",
                borderRadius: "30px",
                backgroundColor: "#DDFEE4",
                color: "#289741",
              }}
            >
              사용 가능
            </div>
          )}
          <p
            style={{
              fontSize: Common.fontSize.fontM,
              fontWeight: Common.fontWeight.extrabold,
            }}
          >
            INFUSION PUMP
          </p>
          <p style={{ fontSize: Common.fontSize.fontXS }}>
            <span
              style={{
                fontWeight: Common.fontWeight.bold,
              }}
            >
              자산 코드{" "}
            </span>
            ED1390FA2
          </p>
          <p style={{ fontSize: Common.fontSize.fontXS }}>
            <span
              style={{
                fontWeight: Common.fontWeight.bold,
              }}
            >
              현재위치{" "}
            </span>
            내과 A동 A101호
          </p>
        </div>
      </div>
      {id ? null : (
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
      )}
    </Box>
  );
}
