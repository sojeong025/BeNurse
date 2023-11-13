import Container from "@components/atoms/Container/Container";
import { useEffect, useState } from "react";
import { customAxios } from "../../libs/axios";
import { useParams } from "react-router-dom";
import * as S from "./HandOverReadPage.styles";
import { RiFileList2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function HandOverReadPage() {
  const { handoversetId } = useParams();
  const [handoverDetails, setHandoverDetails] = useState([]);

  useEffect(() => {
    customAxios
      .get("HandoverSet/details", {
        params: {
          ID: handoversetId,
        },
      })
      .then((res) => {
        console.log("인계장 detail 요청", res);
        setHandoverDetails(res.data.responseData);
      });
  }, [handoversetId]);

  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <div style={{ marginTop: "84px", paddingTop: "24px" }}>
        <S.HandoverList>
          <p className="handovertitle">인계장 목록</p>
          <p className="handovercontext">
            현재 인계장 내의 환자 수는 {handoverDetails.length}명 입니다
          </p>
        </S.HandoverList>
        {handoverDetails.map((item, index) => (
          <NavLink
            to={`${item.patientID}`}
            key={index}
          >
            <S.HandoverPatient>
              <S.HandoverPatientLeft>
                <S.Patient>
                  <p className="icon">
                    <RiFileList2Line size={30} />
                  </p>
                  <p>{item.patientName} 환자 인계장</p>
                </S.Patient>
                <div>시간</div>
              </S.HandoverPatientLeft>
              <S.HandoverPatientRight>사진자리</S.HandoverPatientRight>
            </S.HandoverPatient>
          </NavLink>
        ))}
      </div>
    </Container>
  );
}
