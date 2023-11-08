import { AuthenticationService } from "./AuthenticationService";
import KAKAO from "@assets/Images/web_kakao_login.png";

export default function AdminSignupPage() {
  const handleLogin = () => {
    localStorage.setItem("preLoginpath", window.location.pathname);
    AuthenticationService.loginSocialKakao();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
      }}
    >
      <p style={{ fontSize: "50px", fontWeight: 800 }}>Be Nurse</p>
      <img
        onClick={handleLogin}
        src={KAKAO}
        style={{ cursor: "pointer", width: "460px", marginTop: "20px" }}
        alt=""
      />
    </div>
  );
}
