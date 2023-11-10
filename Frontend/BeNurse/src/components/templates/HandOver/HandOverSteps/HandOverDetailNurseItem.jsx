import React, { useEffect, useState } from "react";
import Textarea from "@components/atoms/Textarea/Textarea";
import Box from "../../../atoms/Box/Box";
import { Common } from "../../../../utils/global.styles";
import { customAxios } from "../../../../libs/axios";

export default function HandOverDetailNurseItem({ id }) {
  const [journalItem, setJournalItem] = useState(null);
  const [inputs, setInputs] = useState([{ name: "간호일지 1", value: "" }]);
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newInputs = [...inputs];
    newInputs[index].value = value;
    setInputs(newInputs);
    if (value) setShowWarning(false);
  };

  useEffect(() => {
    customAxios("emr/journal?id=" + id).then((res) => {
      setJournalItem(res.data.responseData);
    });
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
      {inputs.map((input, index) => (
        <Textarea
          value={input.value}
          placeholder={"인계사항을 입력 해주세요."}
          onChange={(e) => handleInputChange(e, index)}
          props={"margin-bottom: 30px;"}
        />
      ))}
    </>
  );
}
