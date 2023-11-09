A. 사용한 JVM, WAS 제품 등의 종류와 설정 값, 버전(IDE버전 포함) 기재
- JVM : JDK17
- WAS : Tomcat
- 웹서버 : nginx/1.18.0 (Ubuntu)
- IDE
    - Front & IoT - Visual Studio Code(v1.83)
    - Back - Eclipse IDEA 2023.1.3


B. 빌드 시 사용되는 환경변수 등의 내용 상세 기재
- env.properties (for SpringBoot)
```
jwt.secret=VlwEyVBsYt9V7zq57TejMnVUyzblYcfPQye08f7MGVA9XkHa

# Kakao API
kakao.client.id=b0fd97eee94cd828a98545a4293a321f
kakao.client.secret=YTMTbfU8mOE6QK5wLaR8LE85o2yWKTUJ
#kakao.redirect.url=http://localhost:5173/oauth/callback/kakao

# Redis 
spring.redis.host=k9e105.p.ssafy.io
#spring.redis.host=localhost
spring.redis.port=6379
```
- .env(Front)
```
VITE_KAKAO_LOGIN_URL=https://kauth.kakao.com/oauth/authorize?client_id=b0fd97eee94cd828a98545a4293a321f&response_type=code
VITE_REDIRECT_URI=https://k9e105.p.ssafy.io/oauth/callback/kakao

```


C. 배포 시 특이사항 기재
- Nginx를 사용해서 프록시 역할 및 포트 포워딩
- 하나의 ec2안에 Docker를 사용해 Frontend container, Backend container, Jenkins container, Redis container 동작
- 무중단 배포를 위해 포트 스위칭 작업 자동화

D. DB 접속 정보 등 프로젝트(ERD)에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록
- 소셜 로그인
- 관리자 계정 없음


