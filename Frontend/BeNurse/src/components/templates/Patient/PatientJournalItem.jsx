import React, { useState, useEffect } from "react";
import { Common } from "@utils/global.styles";
import * as S from "./PatientJournalItem.styles";
import moment from "moment";

import Box from "../../atoms/Box/Box";
import LongPressable from "react-longpressable";

import { useBottomSheetStore } from "../../../store/store";

export default function PatientJournalItem({ journal, handleOpenModal }) {
  const { isEditActivated, ActivateEdit, selectedID, setSelectedID } =
    useBottomSheetStore((state) => state);
  const [isSelected, setIsSelected] = useState(false);

  const onLongPress = (id) => {
    ActivateEdit(`${id}/update`, (e) => handleOpenModal(e, id));
  };

  const expandItem = () => {
    setIsSelected(!isSelected);
  };

  return (
    <S.StyledJournalItem isSelected={isSelected}>
      <S.TimeChip>
        <div className="time_point"></div>
        <div className="time_label">
          {moment(journal.datetime).format("HH:mm")}
        </div>
      </S.TimeChip>

      <LongPressable
        onLongPress={() => onLongPress(journal.id)}
        onShortPress={expandItem}
        longPressTime={400}
      >
        <S.JournalContentBox isSelected={isSelected}>
          <div className="journal_top">{journal.content}</div>
          <hr style={{ width: "100%", border: "0.5px solid #D0BFFF" }} />
          <div className="journal_bottom">
            <div className="journal_type">{journal.category}</div>
            <div>{journal.writer} 간호사</div>
          </div>
        </S.JournalContentBox>
      </LongPressable>
    </S.StyledJournalItem>
  );
}
