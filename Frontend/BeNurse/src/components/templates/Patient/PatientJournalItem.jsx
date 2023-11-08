import React, { useState, useEffect } from "react";
import * as S from "./PatientJournalItem.styles";
import moment from "moment";

import LongPressable from "react-longpressable";

import { useBottomSheetStore } from "../../../store/store";

export default function PatientJournalItem({ journal, handleOpenModal }) {
  const { isEditActivated, ActivateEdit, selectedID, setSelectedID } =
    useBottomSheetStore((state) => state);
  const [isSelected, setIsSelected] = useState(false);
  const [currentNurseId, setCurrentNurseId] = useState(0);

  useEffect(() => {
    setCurrentNurseId(localStorage.getItem("nurseID"));
  }, []);

  const onLongPress = (id) => {
    ActivateEdit(`${id}/update`, (e) => handleOpenModal(e, id));
  };

  const expandItem = () => {
    setIsSelected(!isSelected);
  };

  return (
    <S.StyledJournalItem isSelected={isSelected}>
      <S.TimeChip isAuthor={currentNurseId == journal.writerID}>
        <div className="time_point"></div>
        <div className="time_label">
          {moment(journal.datetime).format("HH:mm")}
        </div>
      </S.TimeChip>

      <LongPressable
        onLongPress={() => {
          if (currentNurseId == journal.writerID) {
            onLongPress(journal.id);
          }
        }}
        onShortPress={expandItem}
        longPressTime={400}
      >
        <S.JournalContentBox
          isAuthor={currentNurseId == journal.writerID}
          isSelected={isSelected}
          type={journal.category}
        >
          <div className="journal_top">{journal.content}</div>
          <hr style={{ width: "100%", border: "0.5px solid #D0BFFF" }} />
          <div className="journal_bottom">
            <div className="journal_type">{journal.category}</div>
            <div className="journal_nurse">
              <p className="author">ME</p>
              <p className="name">{journal.name} 간호사</p>
            </div>
          </div>
        </S.JournalContentBox>
      </LongPressable>
    </S.StyledJournalItem>
  );
}
