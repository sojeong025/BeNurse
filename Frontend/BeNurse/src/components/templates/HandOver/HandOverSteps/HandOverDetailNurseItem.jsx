import React, { useEffect, useState } from "react";
import Textarea from "@components/atoms/Textarea/Textarea";
import Box from "../../../atoms/Box/Box";
import { Common } from "../../../../utils/global.styles";
import { customAxios } from "../../../../libs/axios";
import { useHandoverSetStore } from "../../../../store/store";

export default function HandOverDetailNurseItem({ item }) {
  const [journalItem, setJournalItem] = useState(null);
  const { handoverJournals, setHandoverJournals } = useHandoverSetStore(
    (state) => state,
  );
  const updatedJournal = item;

  const handleInputChange = (e) => {
    updatedJournal.comment = e.target.value;
  };

  useEffect(() => {
    customAxios("emr/journal?id=" + item.journalID).then((res) => {
      setJournalItem(res.data.responseData);
    });

    return () => {
      const newHandoverJournal = [
        ...handoverJournals.filter((prevItem) => {
          return prevItem.journalID !== item.journalID;
        }),
        updatedJournal,
      ];
      setHandoverJournals(() => newHandoverJournal);
    };
  }, []);

  return (
    <>
      <Box
        type={"white"}
        size={["100%", "70px"]}
        flex={["flex-start", "center"]}
        margin={"0px 0px 16px 0px"}
        props={"padding: 10px 16px; box-sizing: border-box;"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            width: "40px",
            marginRight: "14px",
            fontSize: Common.fontSize.fontXS,
            fontWeight: Common.fontWeight.regular,
          }}
        >
          <span>
            {journalItem && journalItem.datetime.slice(5, 7)}.
            {journalItem && journalItem.datetime.slice(8, 10)}
          </span>
          <span>{journalItem && journalItem.datetime.slice(11, 16)}</span>
        </div>
        <div style={{ width: "100%", fontSize: Common.fontSize.fontXS }}>
          <p
            style={{
              width: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {journalItem && journalItem.content}
          </p>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: Common.fontSize.fontXXS,
              fontWeight: Common.fontWeight.regular,
            }}
          >
            <p>{journalItem && journalItem.category}</p>
            <p>{journalItem && journalItem.name} 간호사</p>
          </div>
        </div>
      </Box>
      <Textarea
        defaultValue={item.comment}
        placeholder={"인계사항을 입력 해주세요."}
        onChange={(e) => handleInputChange(e)}
        props={"margin-bottom: 30px;"}
      />
    </>
  );
}
