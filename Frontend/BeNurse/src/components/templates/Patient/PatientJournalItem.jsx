import React, { useState, useEffect } from "react";
import { Common } from "@utils/global.styles";

import Box from "../../atoms/Box/Box";
import LongPressable from "react-longpressable";

import { useBottomSheetStore } from "../../../store/store";

export default function PatientJournalItem({ id }) {
  const { isEditActivated, ActivateEdit, selectedID, setSelectedID } =
    useBottomSheetStore((state) => state);
  const [isSelected, setIsSelected] = useState(false);

  const onLongPress = () => {
    ActivateEdit("", "");
  };

  const expandItem = () => {
    setSelectedID(id);
  };

  useEffect(() => {
    if (id === selectedID) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedID]);

  return (
    <div
      id={id}
      style={{
        display: "flex",
        zIndex: 1,
        marginTop: "10px",
        marginBottom: "20px",
      }}
    >
      <Box
        type={"purple03"}
        size={["22px", "22px"]}
        margin={"0px 10px 0px 30px"}
      />
      <div style={{ display: "flex", alignItems: "center", height: "22px" }}>
        <span style={{ fontSize: Common.fontSize.fontS }}>19:00</span>
      </div>
      <LongPressable
        onLongPress={onLongPress}
        onShortPress={expandItem}
        longPressTime={400}
      >
        <div
          style={{
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            width: "276px",
            height: isSelected ? "100px" : "50px",
            border: "1px solid #956eff",
            borderRadius: "16px",
            marginTop: "-6px",
            marginLeft: "10px",
            transition: "all 0.2s",
          }}
        >
          <div
            style={{
              width: isSelected ? "278px" : "276px",
              height: isSelected ? "100px" : "30px",
              transition: "all 0.2s",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: Common.fontSize.fontXS,
                letterSpacing: "1.4px",
              }}
            >
              ativan, botropase, adelavin, bromhxine, gaaster, cefteriaxone, H/S
              1000ml 12000cc/hr
            </span>
          </div>
          <hr style={{ width: "276px", border: "0.5px solid #D0BFFF" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "276px",
              height: "24px",
            }}
          >
            <span style={{ fontSize: Common.fontSize.fontXS }}>
              정은경 간호사
            </span>
            <div
              style={{
                margin: "0px 6px",
                width: "15px",
                height: "15px",
                backgroundColor: "gray",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </div>
      </LongPressable>
    </div>
  );
}
