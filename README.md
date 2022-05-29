# 우리가족 소통공간 👨‍👩‍👧‍👦도란도란👨‍👩‍👧‍👦
![그림11](https://user-images.githubusercontent.com/100390926/170831818-027ed71a-cfce-492c-a30b-675b477c03ec.png)

<br>

## 📌 바로가기
- 사이트 바로가기 : https://www.dorandorans.com
- 프론트엔드 GitHub Repository : https://github.com/Jayteeee/Family_Project
- 백엔드 GitHub Respository : https://github.com/doremilan/team8_familyProject
- 시연 영상 보러가기: xx

<br>

## ⏱ 프로젝트 기간
> 2022.04.22 ~ 2022.06.03 (6주)

<br>

## 🌈 도란도란 서비스 주요기능
<p6> 🔔 도란도란은 반응형으로 웹과 모바일 모두 이용 가능한 서비스입니다.</p6>
#### 1️⃣ 함께 달성하는 재미를 느낄 수 있는 🏆 가족 미션 🏆
#### 2️⃣ 우리 가족의 일정을 한눈에 파악할 수 있는 📅 가족 캘린더 📅
#### 3️⃣ 남는 건 사진인 거 아시죠? 우리 가족만의 📷 포토 갤러리 📷
#### 4️⃣ 듣고 싶은 목소리를 언제든 꺼내들을 수 있는 💌 음성 메시지함 💌 

<img src="https://www.dorandorans.com/static/media/Web_01.29cbf948c7a423b343f6.png">

<br>

## ✨ 아키텍쳐
<br>

![아키텍쳐 최최최최종](https://user-images.githubusercontent.com/100390926/170860219-34dbdce9-91c1-4c1a-8265-0b79f14a93b3.png)

<br>

## 🔨 기술스택
### **Tech**
<p>
<img src='https://img.shields.io/badge/javascript-F7DF1E?logo=javascript'/>
<img src='https://img.shields.io/badge/Node-version16.13.1-green?logo=Node.js'/>
<img src='https://img.shields.io/badge/Express-v4.18.0-black?logo=Express'/>
<img src='https://img.shields.io/badge/MongoDB-version111-green?logo=mongodb'/>
<br>
<img src='https://img.shields.io/badge/socket.io-v4.4.1-white?logo=Socket.io'/>
<img src='https://img.shields.io/badge/prettier-v2.5.1-pink?logo=prettier'/>
<img src="https://img.shields.io/badge/Passport-v0.5.2-34E27A?logo=Passport&logoColor=white" />
<img src="https://img.shields.io/badge/JsonWebToken-v8.5.1-8a8a8a?logo=JSON Web Tokens&logoColor=white" />
<img src="https://img.shields.io/badge/Git hub-000000?logo=Github&logoColor=white" />
<img src="https://img.shields.io/badge/nginx-v1.14.0-green?logo=nginx&logoColor=white" />
<img src="https://img.shields.io/badge/PM2-000000?logo=PM2&logoColor=white" />
<br>
</p>

<br>

## 📚 라이브러리 
| name                | Appliance             | version  |
| :-----------------: | :-------------------: | :------: |
| bcrypt              | 비밀번호 암호화        |5.0.1|
| cors                | CORS 핸들링            |2.8.5|
| dotenv              | 환경변수 설정           |16.0.0|
| helmet              | HTTP header 보안       |5.0.2|
| joi                 | validator              |17.6.0|
| mongoose            | MongoDB ODM            |6.3.2|
| jsonwebtoken        | JWT토큰 발급             |8.5.1|
| passport            | node.js authentication  |0.5.2|
| passport-kakao      | 카카오 로그인 모듈       |1.0.1|
| multer              | 파일 업로드             |1.4.4|
| multer-s3           | AWS S3 파일 업로드       |2.10.0|
| ffmpeg              | 파일 변환               |2.1.2|
| socket.io           | 실시간 알림             |4.5.1|
| morgan              | HTTP 요청 로그 관리      |1.10.0|
| winston             | 전체 서비스 로그 관리     |3.7.2|
| jest                |  테스트코드              |28.1.0|
| artillery	          |  퍼포먼스 테스팅 툴      |2.0.0-17|
|express-rate-limit   | DDos 보안      |2.0.0-17|

<br>

## 👾 팀원 소개
| Name            | GitHub                              | Position  |
| --------------- | ----------------------------------- | --------- |
| 😁  이미란 🔰   | https://github.com/doremilan        | 백엔드     |
| 😊  성영호      | https://github.com/Hoya11           | 백엔드     |
| 🤪  서현우      | https://github.com/SEOCL            | 백엔드     |
| 🤓  김정태 🔰   | https://github.com/Jayteeee         | 프론트엔드 |
| 🤔  이덕행      | https://github.com/Deokhaeng        | 프론트엔드 |
| 😄  정주현      | -                                   | 디자인     |
| 🤭  윤혜원      | -                                   | 디자인     |

<br>
   
   
## 🚀 트러블 슈팅

### ✅ 사용자 편의 증진
<details>
  <summary>음성메세지 파일 변환</summary>

  * 도입 이유
    - 음성메세지 녹음 시 IOS 기기에서 녹음 및 재생이 불가능한 문제발생
  * 문제 상황
    - 녹음 후 저장 시, 저장되는 녹음파일의 오디오 포맷 : webm/Opus
    - webm 파일은 macOS 및 iOS의 IE 및 Safari는 내장 지원을 제공하지 않음을 확인
  * 해결 방안
    - 안드로이드뿐만 아니라 iOS에서 지원하는 오디오 포맷 형식으로 변환하여 저장 필요
    - iOS에서 지원하는 오디오 포맷 확인: AAC, MP3, WAV, AIFF만 지원함 
  * 의사 결정 및 결과
    - 사용자가 기기에 상관없이 모든 기능을 이용할 수 있게 ffmpeg 파일변환 라이브러리 도입
    - ffmpeg의 컨버팅 기능을 이용해 프론트엔드에서 받은 wepm파일을 mp3확장자로 컨버팅 후 저장하여 문제해결 
      <p><img src="https://user-images.githubusercontent.com/100390926/170860580-a00d7ab8-5088-4a9e-991c-1d53fea939d1.png" /></p>
</details>

<details>
  <summary>Socket.io를 활용한 실시간 알림</summary>

  * 도입 이유
    - MVP 기능구현 중, 누구나 email 검색을 통해 가족원으로 추가될 수 있는 가족 구성방식의 문제점 발견
  * 문제 상황
    - email 검색만으로도 불특정 다수의 사람이 나의 가족원으로 추가될 수 있음
  * 해결 방안
    - 가족 구성원 추가 시, 당사자의 승락 & 거부 확인절차 추가
    - 실시간으로 초대 알림메시지가 발송 가능한 가족 초대기능을 구현하여 문제해결
  * 의사 결정
    - websocket 대신 모든 브라우저에서 사용 가능한 socket.io 라이브러리를 적용하여 기능구현 결정
  * 기능구현 중 만난 문제 상황 
    - 로컬에서 소켓연결 및 작동테스트를 확인하고 서버에 올려 클라이언트와 연동 중, 리버스 프록시 용으로 설치해놓은 Nginx의 설정 관련 문제로 웹소켓 연결실패 문제발생
  * 해결 방안
    - socket.io와 관련한 Nginx의 설정을 추가 & 변경하여 문제해결 (아래 3가지 사항 설정)
    - (1) proxy HTTP version 1.1; , (2) proxy set_header Connection ""; (3) upstream keepalive 설정 추가
    - (1) Nginx는 upstream 서버로 proxy를 할 때 HTTP 버전을 1.0으로 1.0으로 바꿔서 보냄, 따라서 Nginx 공식문서에서 권장하는 버전 1.1으로 변경함
    - (2) HTTP/1.1에서는 Connection을 유지하는 것이 기본이기 때문에 Connection 헤더가 필요없음
    - (3) socket 연결 방식은 3way handshake 방식으로, keepalive 설정을 통해 IN/OUT access 시간을 늘려주어, 리소스 소모량을 감소시키고 웹페이지 로드 속도를 높임
      <p><img src="https://user-images.githubusercontent.com/100390926/170860892-de2ad264-10cf-48f5-9ee7-4d3ba18bbc10.png" /></p>
</details>

### ✅ 서비스 보안 강화
<details>
  <summary>프록시 서버 및 https 적용</summary>

  * 도입 이유
    - 음성메세지 녹음 시 IOS 기기에서 녹음 및 재생이 불가능한 문제발생
  * 문제 상황
    - 녹음 후 저장 시, 저장되는 녹음파일의 오디오 포맷 : webm/Opus
    - webm 파일은 macOS 및 iOS의 IE 및 Safari는 내장 지원을 제공하지 않음을 확인
  * 해결 방안
    - 안드로이드뿐만 아니라 iOS에서 지원하는 오디오 포맷 형식으로 변환하여 저장 필요
    - iOS에서 지원하는 오디오 포맷 확인: AAC, MP3, WAV, AIFF만 지원함 
  * 의사 결정 및 결과
    - 사용자가 기기에 상관없이 모든 기능을 이용할 수 있게 ffmpeg 파일변환 라이브러리 도입
    - ffmpeg의 컨버팅 기능을 이용해 프론트엔드에서 받은 wepm파일을 mp3확장자로 컨버팅 후 저장하여 문제해결 
</details>

<details>
  <summary>XSS(Cross-site scripting)공격 예방</summary>

  * 도입 이유
    - 음성메세지 녹음 시 IOS 기기에서 녹음 및 재생이 불가능한 문제발생
  * 문제 상황
    - 녹음 후 저장 시, 저장되는 녹음파일의 오디오 포맷 : webm/Opus
    - webm 파일은 macOS 및 iOS의 IE 및 Safari는 내장 지원을 제공하지 않음을 확인
  * 해결 방안
    - 안드로이드뿐만 아니라 iOS에서 지원하는 오디오 포맷 형식으로 변환하여 저장 필요
    - iOS에서 지원하는 오디오 포맷 확인: AAC, MP3, WAV, AIFF만 지원함 
  * 의사 결정 및 결과
    - 사용자가 기기에 상관없이 모든 기능을 이용할 수 있게 ffmpeg 파일변환 라이브러리 도입
    - ffmpeg의 컨버팅 기능을 이용해 프론트엔드에서 받은 wepm파일을 mp3확장자로 컨버팅 후 저장하여 문제해결 
</details>

### ✅ 서버 성능 개선
<details>
  <summary>로드밸런싱 및 스트레스 테스트</summary>

  * 도입 이유
    - 음성메세지 녹음 시 IOS 기기에서 녹음 및 재생이 불가능한 문제발생
  * 문제 상황
    - 녹음 후 저장 시, 저장되는 녹음파일의 오디오 포맷 : webm/Opus
    - webm 파일은 macOS 및 iOS의 IE 및 Safari는 내장 지원을 제공하지 않음을 확인
  * 해결 방안
    - 안드로이드뿐만 아니라 iOS에서 지원하는 오디오 포맷 형식으로 변환하여 저장 필요
    - iOS에서 지원하는 오디오 포맷 확인: AAC, MP3, WAV, AIFF만 지원함 
  * 의사 결정 및 결과
    - 사용자가 기기에 상관없이 모든 기능을 이용할 수 있게 ffmpeg 파일변환 라이브러리 도입
    - ffmpeg의 컨버팅 기능을 이용해 프론트엔드에서 받은 wepm파일을 mp3확장자로 컨버팅 후 저장하여 문제해결 
</details>
