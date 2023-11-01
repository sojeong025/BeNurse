import React, { useState, useEffect } from "react";
import { Common } from "@utils/global.styles";
import * as S from "./PatientJournalItem.styles";

import Box from "../../atoms/Box/Box";
import LongPressable from "react-longpressable";

import { useBottomSheetStore } from "../../../store/store";

export default function PatientJournalItem({ id, journal }) {
  const { isEditActivated, ActivateEdit, selectedID, setSelectedID } =
    useBottomSheetStore((state) => state);
  const [isSelected, setIsSelected] = useState(false);

  const onLongPress = () => {
    ActivateEdit("", "");
  };

  const expandItem = () => {
    setIsSelected(!isSelected);
  };

  return (
    <S.StyledJournalItem
      id={id}
      isSelected={isSelected}
    >
      <S.TimeChip>
        <div className="time_point"></div>
        <div className="time_label">{journal.time.format("hh:mm")}</div>
      </S.TimeChip>

      <LongPressable
        onLongPress={onLongPress}
        onShortPress={expandItem}
        longPressTime={400}
      >
        <S.JournalContentBox isSelected={isSelected}>
          <div className="journal_top">{journal.content}</div>
          <hr style={{ width: "100%", border: "0.5px solid #D0BFFF" }} />
          <div className="journal_bottom">{journal.writer} 간호사</div>
        </S.JournalContentBox>
      </LongPressable>
    </S.StyledJournalItem>
  );
}
