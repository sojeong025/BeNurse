import React from "react";
import { Link } from "react-router-dom";

import { Common } from "../../../utils/global.styles";
import { BottomSheet } from "react-spring-bottom-sheet";
import JournalDatePicker from "@components/templates/Patient/JournalDatePicker";
import JournalTimeLine from "@components/templates/Patient/JournalTimeLine";
import CreatePencilButton from "@components/atoms/Button/CreatePencilButton";
import BottomSelectPanel from "@components/templates/BottomSelectPanel/BottomSelectPanel";

export default function HandOverDetailDosage() {
  return (
    <div>
      <p
        style={{
          padding: "20px 14px",
          color: Common.color.black02,
          fontSize: Common.fontSize.fontM,
          fontWeight: Common.fontWeight.extrabold,
        }}
      >
        투약 및 수액
      </p>
      <BottomSheet
        className="handover-detail"
        open
        blocking={false}
        defaultSnap={({ maxHeight }) => maxHeight - maxHeight / 4.5}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 10,
          maxHeight - maxHeight / 4.5,
        ]}
      >
        <div style={{ width: "100%", height: "810px" }}>
          <JournalDatePicker />
          <JournalTimeLine />
        </div>
      </BottomSheet>
      <Link
        to="write"
        style={{
          position: "absolute",
          right: "14px",
          bottom: "80px",
          zIndex: 1,
        }}
      >
        <CreatePencilButton />
      </Link>
      <BottomSelectPanel
        modifyLabel={"일지 수정"}
        deleteLabel={"일지 삭제"}
      />
    </div>
  );
}
