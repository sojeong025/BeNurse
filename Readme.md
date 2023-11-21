<div align="center">

# 🏥&nbsp; BeNurse

간호사들의 <b>업무 편의성을</b>올려주는 서비스<br/>

<img src="/uploads/cc6e14bf4ffd6073f21c45a9b6b09db0/BeNurseIcon.png" width="200">
</div>

## 목차

1. [개요](#개요)
2. [서비스 화면](#서비스-화면)
3. [기술 소개](#기술-소개)
4. [개발 환경](#개발-환경)
5. [설계 문서](#설계-문서)
6. [팀원 소개](#팀원-소개)

## 1. 개요

> <b>프로젝트 기간</b> : 2023/10/09 ~ 2023/11/17 <br> > <b>참고자료 </b> : 🎞 [UCC]()
> 📃 [최종발표 자료]()
> <br>

## 2. 서비스 화면

📱 Mobile

💉 <b>Login & Invite_Code</b>

| <img width="300" src="/uploads/5ca5d5735e57935f4a7c83b2f76c6133/login.gif"> | <img width="300" src="/uploads/dd6fdff47edc5d8c9cef76f403fa83f5/invite.gif"> |
| :-------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                               **Login Page**                                |                               **Invite Code**                                |

<br>
💉 <b>Main</b>

| <img width="300" src="/uploads/86ba79b227b04d3361c7cbb0edaa517e/mainpage.gif"> | <img width="300" src="/uploads/b4068625c24082868a3bad06be6c18e7/notice.gif"> |
| :----------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                                 **Main Page**                                  |                                  **Notice**                                  |
|  <img width="300" src="/uploads/9c80fc895d50358123a2613f738ebfd7/mypage.gif">  |  <img width="300" src="/uploads/6b0f044c79132584e9aa8922d94bbb21/tip.gif">   |
|                                  **My Page**                                   |                                   **Tip**                                    |

<br>
💉 <b>Handover</b>

| <img width="300" src="/uploads/5ca5d5735e57935f4a7c83b2f76c6133/login.gif"> | <img width="300" src="/uploads/dd6fdff47edc5d8c9cef76f403fa83f5/invite.gif"> |
| :-------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                               **Handover Main Page**                                |                               **Create Handover**                                |

<br>

| <img width="300" src="/uploads/5ca5d5735e57935f4a7c83b2f76c6133/login.gif"> | <img width="300" src="/uploads/dd6fdff47edc5d8c9cef76f403fa83f5/invite.gif"> |
| :-------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                               **Create Handover**                                |                               **Create Handover**                                |

<br>

| <img width="300" src="/uploads/5ca5d5735e57935f4a7c83b2f76c6133/login.gif"> | <img width="300" src="/uploads/dd6fdff47edc5d8c9cef76f403fa83f5/invite.gif"> |
| :-------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                               **Take&Give Handover**                                |                               **Temp Handover**                                |

<br>
💉 <b>Schedule</b>

|    <img src="">     |     <img src="">     |
| :-----------------: | :------------------: |
| **Weekly Schedule** | **Monthly Schedule** |
|    <img src="">     |     <img src="">     |
|  **Day Off Apply**  |    **Day Detail**    |

<br>
💉 <b>Patient Management</b>

|    <img src="/uploads/43ac1d52a769f9d572d69b3be6d7bf62/App_PatientList.gif" width="300">     |    <img src="/uploads/1aacce4039d61fa0aad323f703c87860/App_PatientDetail.gif" width="300">    |
| :-----------------: | :----------------: |
|  **Patient List**   | **Patient Detail** |
|    <img src="/uploads/58d4efbd7fb177c62acf7e058a922ffd/App_PatientJournal.gif" width="300">     |                    |
| **Patient Journal** |                    |

<br>
💉 <b>Device Management</b>

|    <img src="/uploads/6293059ea9c269e318f56ea864cbd8da/App_DeviceMain.gif" width="300">     |    <img src="/uploads/af0de6273ca0cc151416df26f2d92d5d/App_DeviceList.gif" width="300">     |
| :-----------------: | :-----------------: |
|   **Device Main**   |   **Device List**   |
|    <img src="/uploads/ed13876bca46c4397c875e0e97a88e6a/App_DeviceLocation.gif" width="300">     |    <img src="/uploads/36680ee7348f5bb9e88796c24be34972/App_DeviceUse.gif" width="300">     |
| **Device Location** | **Device Use List** |

<br>
  
 💶 Web
💊 <b>Login & Select Role</b>

| <img src="/uploads/f7cf66a469b66cbf6b3cc6a911f0619c/Web_Login.gif" width="386"> |  <img src="/uploads/137e3c76ae2c9e1fd41efbc928504be6/Web_Role.gif" width="386">   |
| :-----------------------------------------------------------------: | :-------------: |
|                           **Login Page**                            | **Select Role** |
<br>
💊 <b>Create Hospital & Main</b>

| <img src="/uploads/41503ba0eb739ff49e51fd4f5f40c4a8/Web_CreateHospital.gif" width="386"> | <img src="/uploads/6e27f433ab533455e5a9adfe24d6719d/Web_Main.gif" width="386"> |
| :----------------------------------------------------------------: | :----------: |
|                           **Create Hospital**                           | **Main Page** |

<br>
💊 <b>Make Schedule & Management Hospital</b>

| <img src="/uploads/6fe905293ec3ad002e5f6f1f9bc2c347/Web_mkschedule.gif" width="386"> | <img src="/uploads/4d79338e7d3f81a9cd361bf8caa16509/Web_Setting.gif" width="386"> |
| :----------------------------------------------------------------------: | :-------------------------------------------------------------------: |
|                            **Make Schedule**                             |                            **Management**                             |

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
- 디자인 : Figma, PowerPoint, ERD Cloud

### ⌨ IDE

- Visual Studio Code `1.83.0`
- Eclipse `4.29.0`
- Android studio

### 🖥 Frontend

### 💾 Backend

- jpa
- redis
- security
- jdbc
- oauth2
- lombok
- mysql
- swagger
- jwt
- kakaoLogin
- openFeign
- mariaDB

### 📱 Mobile

- React Native
- NFC
- BLE
- Android studio

### 📟 Infra

- AWS EC2
- Nginx 1.18.0
- Docker 20.10.12
- Jenkins
- Redis
- Ubuntu 20.04.6 LTS

<br>

## 5. 설계 문서

### ◼ Figma

<div align="center">
  <img src="/uploads/e41dcbe7fe227a7afc2047d7ce66b16a/피그마_웹.PNG" alt="Figma 웹" width="400"/>
  <img src="/uploads/251534c659e7c6e9bc95413646cbb625/피그마_모바일.PNG" alt="Figma 모바일" width="400"/>
</div>

### ◼ 기능 명세서

<div align="center">
  <img src="/uploads/ed11dc42ae2bf967c0f818c23a8892f8/기능명세서_1_.PNG" alt="기능 명세서 1" width="400"/>
  <img src="/uploads/c048df57ce9c07b536ef55dfad5618c9/기능명세서_2_.PNG" alt="기능 명세서 2" width="400"/>
  <img src="/uploads/4828b5491894f9cf7e8206665c73f951/기능명세서_3_.PNG" alt="기능 명세서 3" width="400"/>
</div>

### ◼ API 명세서

<div align="center">
  <img src="/uploads/d4d24e064d37bad842aee830c555c322/API_1_.PNG" alt="API 명세서 1" width="400"/>
  <img src="/uploads/954964b821805fd627643149d1137018/API_2_.PNG" alt="API 명세서 2" width="400"/>
  <img src="/uploads/8183c6fa36a244bb9ea1f2a879fd2e9f/API_3_.PNG" alt="API 명세서 3" width="400"/>
</div>

### ◼ ERD

<div align="center">
  <img src="/uploads/f88f560ac2368474907769dd0557b8c5/Be_Nurse__5_.png" alt="ERD" width="400"/>
</div>

### ◼ Swagger

<div align="center">
  <img src="/uploads/48bc27e363090f955f5e942203296e7e/swagger_1_.PNG" alt="Swagger 1" width="400"/>
  <img src="/uploads/d53d760800c5d671e1b4a263c4e8eb45/swagger_2_.PNG" alt="Swagger 2" width="400"/>
  <img src="/uploads/b2d7f8b761f27c7894f68b21537a2ff9/swagger_3_.PNG" alt="Swagger 3" width="400"/>
  <img src="/uploads/f10102d3f6b27602dd0ce17ea977a24a/swagger_4_.PNG" alt="Swagger 4" width="400"/>
  <img src="/uploads/b9018c12b98f834a069bfe6489014620/swagger_5_.PNG" alt="Swagger 5" width="400"/>
  <img src="/uploads/d7d7289c48645f6de3845f5ed8aa995c/swagger_6_.PNG" alt="Swagger 6" width="400"/>
  <img src="/uploads/c8694f7432d04f0fa9c791bc7537a2ce/swagger_7_.PNG" alt="Swagger 7" width="400"/>
</div>

### ◼ 시스템 아키텍처

<img src=""/>

# 팀원 소개

|                                      **[김대웅]()**                                      |                                      **[정소정]()**                                      |                                      **[정은경]()**                                      |                                      **[성제현]()**                                       |                                      **[이종윤]()**                                      |                                      **[김성현]()**                                      |
| :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| <img title="" src="/uploads/02b021833b3ac754d219c20a73b0b9cd/웅.png" alt="" width="500"> | <img title="" src="/uploads/58176afadd3eff28ad30876e4c6b7892/소.png" alt="" width="500"> | <img title="" src="/uploads/f1f3df21f874fe5872fd52f857b1a2cb/은.png" alt="" width="500"> | <img title="" src="/uploads/36fe29c1e382512affa6575ce0d9c0c2/SJH.jpg" alt="" width="500"> | <img title="" src="/uploads/290d11714d1efa79d20e4b90beb5b2ce/종.png" alt="" width="500"> | <img title="" src="/uploads/7e01e12d5190f50d8ec1c1c556d981f9/현.png" alt="" width="500"> |
|                                         Frontend                                         |                                         Frontend                                         |                                         Frontend                                         |                                      Backend & CI/CD                                      |                                     Backend & CI/CD                                      |                                           IoT                                            |

## 😎 역할 분담

**Frontend**

- 김대웅 : UX/UI 설계 / / /

- 정소정 : UX/UI 설계 / / / / /

- 정은경 : UX/UI 설계 / / / / /

**Backend & CI/CD**

- 성제현: API 제작 / Redis 캐싱 / 더미데이터 생성 / jenkins / DB 구축

- 이종윤: API 제작 / Redis 캐싱 / ERD 설계 / EMR 서버 제작 / deploy / ssl / nginx

**IoT**

- 김성현 : IoT / NFC 태깅 / IoT 앱 연동
