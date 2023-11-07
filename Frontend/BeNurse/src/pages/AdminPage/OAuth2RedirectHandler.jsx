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
  const [hospitalID, setHospitalID] = useState();

  const getUserInfo = async () => {
    try {
      const response = await customAxios.get("oauth/test/user");
      console.log("사용자 정보 조회 성공", response);
      console.log(response.data.responseData.hospitalID);
      setHospitalID(response.data.responseData.hospitalID);
      return response.data.responseData.hospitalID;
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

      const hospitalID = await getUserInfo();

      let preLocation = localStorage.getItem("preLoginpath");

      if (preLocation === "/login") {
        if (hospitalID === 0) {
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
