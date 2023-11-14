import { AuthenticationService } from "./AuthenticationService";
import KAKAO from "@assets/Images/web_kakao_login.png";
import Logo_white from "@assets/Images/logo_white.svg";

export default function AdminSignupPage() {
  const handleLogin = () => {
    localStorage.setItem("preLoginpath", window.location.pathname);
    AuthenticationService.loginSocialKakao();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: " space-evenly",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
        background:
          "linear-gradient(to right bottom, #9669f9, #9669f9, #9669f9, #9669f9, #9669f9, #9a6ffa, #9e74fa, #a27afb, #ab87fc, #b493fd, #bda0fe, #c6acff)",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "-50px",
        }}
      >
        <iframe
          width="650px"
          height="650px"
          src="https://lottie.host/?file=ceaccc91-d059-4957-a358-dad0f52c2690/yiE3Ape942.json"
        ></iframe>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <img
          src={Logo_white}
          alt=""
          width="250px"
          style={{ marginBottom: "20px" }}
        />
        <p style={{ fontSize: "20px", fontWeight: 400, color: "#ffffff" }}>
          비너스와 함께{" "}
          <b style={{ fontWeight: 800 }}>편하고 효율적인 간호 근무</b>를
          시작해보세요!
        </p>
        <img
          onClick={handleLogin}
          src={KAKAO}
          style={{ cursor: "pointer", width: "350px", marginTop: "20px" }}
          alt=""
        />
      </div>
    </div>
  );
}
