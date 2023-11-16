import React from "react";
import { Link } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import * as S from "./BottomSelectPanel.styles";
import Box from "../../atoms/Box/Box";

import { useBottomSheetStore } from "../../../store/store";

import { FaTrashAlt, FaEdit } from "react-icons/fa";

export default function BottomSelectPanel({ modifyLabel, deleteLabel }) {
  const {
    isEditActivated,
    ActivateEdit,
    DeactivateEdit,
    updateLink,
    deleteLink,
  } = useBottomSheetStore((state) => state);
  return (
    <BottomSheet
      open={isEditActivated}
      onDismiss={DeactivateEdit}
    >
      <div
        style={{
          height: "148px",
        }}
      >
        <Link
          to={updateLink}
          onClick={DeactivateEdit}
        >
          <Box
            type={"transparent"}
            size={["412px", "70px"]}
            border={true}
          >
            <S.PanelButton>
              <FaEdit
                color="#555555"
                size={18}
                style={{ marginRight: "12px" }}
              />
              <span>{modifyLabel}</span>
            </S.PanelButton>
          </Box>
        </Link>
        <Box
          type={"transparent"}
          size={["412px", "70px"]}
        >
          <S.PanelButton
            onClick={(e) => {
              deleteLink(e);
              DeactivateEdit();
            }}
          >
            <FaTrashAlt
              color="#555555"
              size={18}
              style={{ marginRight: "12px" }}
            />
            <span>{deleteLabel}</span>
          </S.PanelButton>
        </Box>
      </div>
    </BottomSheet>
  );
}
