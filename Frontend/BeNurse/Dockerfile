# 베이스 이미지 선택
FROM node:18

# 포트 설정
EXPOSE 5173

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# npm start 스크립트 실행
CMD ["npm", "run", "dev"]