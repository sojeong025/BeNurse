import React, { useState, useEffect } from "react";
import * as S from "./PatientJournalItem.styles";
import moment from "moment";

import LongPressable from "react-longpressable";

import { useBottomSheetStore } from "../../../store/store";
import { useHandoverSetStore } from "../../../store/store";

export default function PatientJournalItem({ journal, handleOpenModal }) {
  const { isEditActivated, ActivateEdit, selectedID, setSelectedID } =
    useBottomSheetStore((state) => state);
  const [isSelected, setIsSelected] = useState(false);
  const [currentNurseId, setCurrentNurseId] = useState(0);
  const {
    isFromHandOver,
    setIsFromHandOver,
    handoverJournalList,
    setHandoverJournalList,
  } = useHandoverSetStore((state) => state);

  const onLongPress = (id) => {
    ActivateEdit(`${id}/update`, (e) => handleOpenModal(e, id));
  };

  const selectItem = () => {
    if (handoverJournalList.includes(journal.id)) {
      const newHandoverJournalList = handoverJournalList.filter(
        (id) => id !== journal.id,
      );
      setHandoverJournalList(() => newHandoverJournalList);
    } else {
      const newHandoverJournalList = [...handoverJournalList, journal.id];
      setHandoverJournalList(() => newHandoverJournalList);
    }
  };

  const expandItem = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    setCurrentNurseId(localStorage.getItem("nurseID"));
  }, []);

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
        onShortPress={isFromHandOver ? () => selectItem() : expandItem}
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
