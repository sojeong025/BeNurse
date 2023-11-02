import axios from "axios";

const KAKAO_AUTH_URL = import.meta.env.VITE_KAKAO_LOGIN_URL;

export const AuthenticationService = {
  loginSocialKakao: function () {
    window.location.href = KAKAO_AUTH_URL;
  },

  kakaoLogin: async function (code) {
    try {
      console.log("Received code:", code);
      const response = await axios.get(
        `http://k9e105.p.ssafy.io:9000/api/benurse/oauth?code=${code}`,
      );
      console.log("kakaoLogin 성공");
      console.log(response.data);

      localStorage.setItem("accessToken", response.data.accessToken);

      return response;
    } catch (error) {
      console.error("kakaoLogin 실패", error);

      throw error;
    }
  },

  registerSuccessfulLoginForJwt: function (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  },
};
