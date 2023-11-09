<div align="center">

# 🎙&nbsp; BeNurse
간호사들의 <b>업무 편의성을</b>올려주는 서비스<br/>

<img src="" width="700">
</div>


## 목차

1. [개요](#개요)
2. [서비스 화면](#서비스-화면)
3. [기술 소개](#기술-소개)
4. [개발 환경](#개발-환경)
5. [설계 문서](#설계-문서)
6. [팀원 소개](#팀원-소개)


## 1. 개요
> <b>프로젝트 기간</b> : 2023/10/09 ~ 2023/11/17 <br>
> <b>참고자료 </b> : 🎞 [UCC]()
📃 [최종발표 자료]()
<br>

## 2. 서비스 화면
1️⃣ <b>1</b>

|<img src="">|<img src="">|
| :------: | :------: |
| **Main Page** | **Login Page** |
|<img src="">|<img src="">|
| **About Page** | **About Page** |
<br>
2️⃣ <b>2</b>

|<img src="">|<img src="">|
| :------: | :------: |
| **Store Page** | **Filter** |
|<img src="">|<img src="">|
| **Product Detail** | **Product Test** |
|<img src="">||
| **Purchase Page** ||
<br>
3️⃣ <b>3</b>

|<img src="">|<img src="">|
| :------: | :------: |
| **No Voice** | **Record Page** |
|<img src="">|<img src="">|
| **Voice Studying Page** | **Voice Finish Page** |
|<img src="">||
| **Product Custom Page** ||

<br>
3️⃣ <b>4</b>

|<img src="">|<img src="">|
| :------: | :------: |
| **Profile Page** | **My Voice Detail** |
|<img src="">|<img src="">|
| **SellList Page** | **Sell Detail** |
|<img src="">||
| **BuyList Page** ||
|<img src="">|<img src="">|
| **UseList Page** | **VoiceUse Detail** |

<br>

## 3. 기술 소개
- ##### 1. 장비 관리
  
  - ###### Three.js를 통한 시각적 위치 정보 전달
  - ###### NFC 태깅을 통한 손쉬운 장비 사용 및 관리
  - ###### ???????????????????????????????????


- ##### 2. 근무표
  
  - ###### 제작된 알고리즘에 의한 근무표 자동 생성
  - ###### 생성된 근무표에서 자신의 근무만을 가져와 스케줄에 자동 등록
  - ###### 간편한 휴무 신청 및 집계

- ##### 3. 인수인계 및 환자 간호일지
  
  - ###### 기존 인수인계의 복잡함과 다양함을 정형화
  - ###### 실시간으로 작성한 간호일지를 가져와 코멘트를 남겨 인수인계 작성의 편리성 증대
  - ###### 인계장의 디지털화로 인한 인계 내용 누락 가능성 대폭 축소
<br>

## 4. 개발 환경
### ⚙ Management Tool
- 형상 관리 : Gitlab, Gerrit
- 이슈 관리 : Jira
- 커뮤니케이션 : Mattermost, Notion, Discord
- 디자인 : Figma, PowerPoint

### 💻 IDE
- Visual Studio Code `1.83.0`
- Spring Tool Suite 4 `4.20.0.RELEASE`

### 📱 Frontend


### 💾 Backend
  - jpa
  - redis
  - security
  - jdbc
  - oauth2
  - lombok
  - h2
  - mysql
  - swagger
  - jwt
  - s3

### IoT



### Infra

- AWS EC2
- Nginx 1.18.0
- Docker 20.10.12
- Jenkins
- Redis
- Ubuntu 20.04.6 LTS

<br>

## 5. 설계 문서


### ◼ 요구사항 명세서

<img src=""/>

<img src=""/>

<img src=""/>

<img src=""/>



### ◼ API 명세서

<img src=""/>

<img src=""/>

<img src=""/>

<img src=""/>

<img src=""/>

<img src=""/>

<img src=""/>

<img src=""/>

<img src=""/>

<img src=""/>



### ◼ ERD

<img src=""/>

### ◼ Swagger


### ◼ 시스템 아키텍처

<img src=""/>

# 팀원 소개

| **[김대웅]()**                                                          | **[정소정]()**                                                           | **[정은경]()**                                                               | **[성제현]()**                                                               | **[이종윤]()**                                                              | **[김성현]()**                                                             |
|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|
| <img title="" src="" alt="" width="500"> | <img title="" src="" alt="" width="500"> | <img title="" src="" alt="" width="500"> | <img title="" src="" alt="" width="500"> | <img title="" src="" alt="" width="500"> | <img title="" src="" alt="" width="500"> |
| Frontend                                                                                           | Frontend                                                                                           | Frontend                                                                                           | Backend & CI/CD                                                                                          | Backend & CI/CD                                                                                            | IoT                                                                                            |

## 😎 역할 분담

**Frontend**

- 김대웅 : UX/UI 설계 /  /  / 

- 정소정 : UX/UI 설계 /  /  /  /  / 

- 정은경 : UX/UI 설계 /  /  /  /  / 

**Backend & CI/CD**

- 성제현: API 제작 / CI/CD 담당 /  / 

- 이종윤: API 제작 / CI/CD 담당 /  / 

**IoT**

- 김성현 : IoT / 
