import axios from "axios";

const KAKAO_AUTH_URL = import.meta.env.VITE_KAKAO_LOGIN_URL;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const AuthenticationService = {
  loginSocialKakao: function () {
    window.location.href = `${KAKAO_AUTH_URL}&redirect_uri=${REDIRECT_URI}`;
  },

  kakaoLogin: async function (code) {
    try {
      const response = await axios.get(
        `https://k9e105.p.ssafy.io:9000/api/benurse/oauth`,
        {
          params: {
            code: code,
            redirect_uri: REDIRECT_URI,
          },
        },
      );

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
