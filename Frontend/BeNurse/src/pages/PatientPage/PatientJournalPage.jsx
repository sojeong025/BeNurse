import React from "react";
import { css } from "@emotion/react";
import { Common } from "../../utils/global.styles";
import { usePatientStore } from "../../store/store";
import PatientJournalItem from "../../components/templates/Patient/PatientJournalItem";
import "react-spring-bottom-sheet/dist/style.css";

// Components
import Box from "../../components/atoms/Box/Box";
import { BottomSheet } from "react-spring-bottom-sheet";

// Icons
import createpencil from "@assets/Icons/createpencil.svg";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export default function PatientJournalPage() {
  const { isEditActivated, ActivateEdit, DeactivateEdit } = usePatientStore(
    (state) => state,
  );
  return (
    <div
      style={{
        position: "relative",
        width: "386px",
        marginTop: "74px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "-13px",
          width: "412px",
          height: "70px",
          backgroundColor: Common.color.purple03,
          zIndex: "2",
          borderRadius: "0px 0px 16px 16px",
        }}
      >
        HEADER
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "84px 0px 0px 0px",
          marginBottom: "34px",
          height: "590px",
          overflow: "scroll",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "366px",
          }}
        >
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <PatientJournalItem />
          <div
            style={{
              position: "absolute",
              width: "322px",
              height: "101%",
              borderLeft: "3px solid" + Common.color.purple02,
              marginTop: "-14px",
            }}
          ></div>
        </div>
        <div
          style={{
            position: "absolute",
            right: "14px",
            bottom: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "57px",
            height: "57px",
            borderRadius: "30px",
            backgroundColor: Common.color.purple03,
            zIndex: 1,
          }}
        >
          <img
            src={createpencil}
            alt=""
          />
        </div>
      </div>
      <BottomSheet
        open={isEditActivated}
        onDismiss={DeactivateEdit}
      >
        <div
          style={{
            height: "184px",
          }}
        >
          <Box
            type={"transparent"}
            size={["412px", "80px"]}
            border={true}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "340px",
                height: "60px",
              }}
            >
              <FaEdit
                color="#555555"
                size={22}
                style={{ marginRight: "8px" }}
              />
              <span
                style={{
                  color: Common.color.black02,
                  fontSize: Common.fontSize.fontM,
                  fontWeight: Common.fontWeight.bold,
                }}
              >
                일지 수정
              </span>
            </div>
          </Box>
          <Box
            type={"transparent"}
            size={["412px", "80px"]}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "340px",
                height: "60px",
              }}
            >
              <FaTrashAlt
                color="#555555"
                size={22}
                style={{ marginRight: "8px" }}
              />
              <span
                style={{
                  color: Common.color.black02,
                  fontSize: Common.fontSize.fontM,
                  fontWeight: Common.fontWeight.bold,
                }}
              >
                일지 삭제
              </span>
            </div>
          </Box>
        </div>
      </BottomSheet>
    </div>
  );
}
