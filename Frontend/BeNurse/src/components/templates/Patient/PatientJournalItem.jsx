import React from "react";
import Box from "../../atoms/Box/Box";
import LongPressable from "react-longpressable";

import { usePatientStore } from "../../../store/store";

export default function PatientJournalItem({}) {
  const { isEditActivated, ActivateEdit } = usePatientStore((state) => state);
  const onLongPress = (e) => {
    ActivateEdit();
  };

  return (
    <div style={{ display: "flex", zIndex: 90, marginBottom: "30px" }}>
      <Box
        type={"purple03"}
        size={["22px", "22px"]}
        margin={"0px 10px 0px 30px"}
      />
      <div style={{ display: "flex", alignItems: "center", height: "22px" }}>
        <span>19:00</span>
      </div>
      <LongPressable
        onLongPress={onLongPress}
        longPressTime={400}
      >
        <Box
          type={"white"}
          size={["288px", "50px"]}
          margin={"0px 0px 0px 10px"}
        />
      </LongPressable>
    </div>
  );
}
