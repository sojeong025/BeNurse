import React from "react";
import { Common } from "../../../utils/global.styles";

// emotions
import Box from "../../atoms/Box/Box";

// Icons
import { MdKeyboardArrowRight } from "react-icons/md";

//Images
import temp from "@assets/Images/temp.png";

<<<<<<< Updated upstream
export default function DeviceItem() {
  return (
    <Box
      type={"white"}
      margin={"0px 0px 20px 0px"}
      size={["384px", "132px"]}
      font={"16px"}
=======
export default function DeviceItem({ listItem, item, beacon, onClick }) {
  return (
    <Box
      type={listItem ? "white" : "transparent"}
      margin={listItem ? "0px 0px 14px 0px" : "0px 0px 0px 0px"}
      padding={"20px"}
      size={listItem ? ["348px", "82px"] : ["372px", "82px"]}
      font={"16px"}
      flex={["flex-start", "center"]}
      onClick={onClick}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          <div
=======
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
              {item.device}
            </div>
          )}
          <p
>>>>>>> Stashed changes
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "72px",
            }}
          >
<<<<<<< Updated upstream
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
=======
            {item.name}
          </p>
          <p style={{ fontSize: Common.fontSize.fontXS }}>
            <span
              style={{
                fontWeight: Common.fontWeight.bold,
              }}
            >
              자산 코드{" "}
            </span>
            {item.id}
          </p>
          <p style={{ fontSize: Common.fontSize.fontXS }}>
            {beacon ? (
              <>
                <span
                  style={{
>>>>>>> Stashed changes
                    fontWeight: Common.fontWeight.bold,
                  }}
                >
                  현재위치{" "}
                </span>
<<<<<<< Updated upstream
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
=======
                {beacon.floor}층 {beacon.location}
              </>
            ) : null}
          </p>
        </div>
      </div>
      {listItem ? (
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
      ) : null}
>>>>>>> Stashed changes
    </Box>
  );
}
