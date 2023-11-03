import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthenticationService } from "./AuthenticationService";
import { customAxios } from "../../libs/axios";

// OAuth2 인증 처리를 위한 컴포넌트
const OAuth2RedirectHandler = () => {
  // URL에서 파라미터 추출
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");
  let navigate = useNavigate();
  const [name, setName] = useState();

  const getUserInfo = async () => {
    try {
      const response = await customAxios.get("oauth/test/user");
      console.log("사용자 정보 조회 성공", response);
      setName(response.data.responseData.name);
      return response.data;
    } catch (error) {
      console.log("사용자 정보 조회 실패", error);
    }
  };

  // 토큰 요청 및 저장하는 함수
  async function fetchToken() {
    try {
      const res = await AuthenticationService.kakaoLogin(code);
      console.log("kakaoLogin 성공");

      // JWT 로그인 처리
      await AuthenticationService.registerSuccessfulLoginForJwt(
        res.data.responseData.accessToken,
      );

      const userInfo = await getUserInfo();

      let preLocation = localStorage.getItem("preLoginpath");

      if (preLocation === "/login") {
        if (name === "test") {
          navigate("/login/join");
        } else {
          navigate("/main");
        }
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

  return (
    <>
      <div>로그인 중</div>;
      <Outlet />
    </>
  );
};

export default OAuth2RedirectHandler;
