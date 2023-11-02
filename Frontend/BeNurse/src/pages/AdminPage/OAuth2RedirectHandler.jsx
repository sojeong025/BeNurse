import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthenticationService } from "./AuthenticationService";

// OAuth2 인증 처리를 위한 컴포넌트
const OAuth2RedirectHandler = () => {
  // URL에서 파라미터 추출
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");
  let navigate = useNavigate();

  // 토큰 요청 및 저장하는 함수
  async function fetchToken() {
    try {
      const res = await AuthenticationService.kakaoLogin(code);
      console.log("kakaoLogin 성공");
      console.log(res);

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("kakaoLogin", "true");

      // JWT 로그인 처리
      await AuthenticationService.registerSuccessfulLoginForJwt(
        res.data.responseData.accessToken,
      );

      let preLocation = localStorage.getItem("preLoginpath");

      if (preLocation === "/login") {
        navigate("/");
      } else {
        navigate("/admin/role");
      }
    } catch (error) {
      console.log("kakaoLogin 실패");
    }
  }

  useEffect(() => {
    fetchToken();
  }, []);

  return <div>로그인 중</div>;
};

export default OAuth2RedirectHandler;
