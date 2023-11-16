import React from "react";

export default function AdminManagementModal({ category }) {
  const [inviteCode, setInviteCode] = useState(null);
  const [count, setCount] = useState(30);
  const [nurseName, setNurseName] = useState("");

  const inputName = (e) => {
    setNurseName(e.target.value);
  };

  const createInviteCode = () => {
    if (nurseName !== "") {
      const data = {
        name: nurseName,
      };
      customAxios.post("invite", data).then((res) => {
        const code = res.data.responseData.split("");
        setInviteCode(code);
        setTimeout(() => {
          setShowInviteForm(false);
          setInviteCode(null);
          setCount(30);
        }, 30000);
      });
    } else {
    }
  };

  const closeInviteModal = (e) => {
    if (e.target === e.currentTarget) {
      setShowInviteForm(false);
      setInviteCode(null);
      setCount(30);
    }
  };

  useEffect(() => {
    if (inviteCode) {
      const id = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);

      if (count === 0) {
        clearInterval(id);
      }
      return () => {
        clearInterval(id);
      };
    }
  }, [count, inviteCode]);

  if (category === "ward") {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#00000039",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={closeInviteModal}
      ></div>
    );
  } else if (category === "employee") {
    return inviteCode ? (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#00000039",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={closeInviteModal}
      >
        <Box
          type={"white"}
          size={["500px", "400px"]}
          props={"flex-direction: column; gap: 40px;"}
        >
          <p>초대 코드</p>
          <p>{count}초 후 자동으로 종료됩니다.</p>
          <div style={{ display: "flex", gap: "4px" }}>
            {inviteCode.map((code) => (
              <Box
                type={"purple01"}
                size={["40px", "60px"]}
              >
                {code}
              </Box>
            ))}
          </div>
          <p>해당 코드를 모바일 환경에서 입력해주세요.</p>
        </Box>
      </div>
    ) : (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#00000039",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={closeInviteModal}
      >
        <Box
          type={"white"}
          size={["500px", "400px"]}
          props={"flex-direction: column; gap: 40px;"}
        >
          <p style={{ fontSize: "20px" }}>신규 간호사 초대</p>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <p style={{ fontSize: "16px" }}>성명 </p>
            <Input
              variant={"default"}
              onChange={inputName}
            />
          </div>
          <Box
            type={"purple03"}
            size={["200px", "60px"]}
            props={"cursor: pointer;"}
            onClick={createInviteCode}
          >
            초대코드 생성하기
          </Box>
        </Box>
      </div>
    );
  } else if (category === "equipment") {
    return <div></div>;
  }
}
