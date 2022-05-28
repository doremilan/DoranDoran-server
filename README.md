# 우리가족 소통공간 👨‍👩‍👧‍👦도란도란👨‍👩‍👧‍👦
![그림11](https://user-images.githubusercontent.com/100390926/170831818-027ed71a-cfce-492c-a30b-675b477c03ec.png)

<br>

## 📌 바로가기
- 사이트 바로가기 : https://www.dorandorans.com
- 프론트엔드 GitHub Repository : https://github.com/Jayteeee/Family_Project
- 백엔드 GitHub Respository : https://github.com/doremilan/team8_familyProject
- 시연 영상 보러가기: xx

<br>

## 프로젝트 기간
> 2022.04.22 ~ 2022.06.03 (6주)

<br>

##  도란도란 서비스 소개
### 🏆 함께 달성하는 재미를 느낄 수 있는 가족 미션
### 📅 우리 가족의 일정을 한눈에 파악할 수 있는 가족 캘린더
### 📷 남는 건 사진인 거 아시죠? 우리 가족만의 포토 갤러리
### 💌 듣고 싶은 목소리를 언제든 꺼내들을 수 있는 음성 메시지함

<br>

<img src="https://www.dorandorans.com/static/media/Web_01.29cbf948c7a423b343f6.png">

<br>

## 🎨아키텍쳐
<br>

![도란도란_아키텍쳐(0528)](https://user-images.githubusercontent.com/100390926/170829780-bbecbc21-b6de-4b9b-8749-14cefc24489d.png)

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
| artillery	          |  퍼포먼스 테스팅 툴      |2.0.0-17

<br>

   
## 🔥 트러블 슈팅
<details>
<summary><strong>사용자 편의</strong></summary>
<div markdown="1">       
  1. {토글리스트의 content}
 <br>
  2. {토글리스트의 content}
</div>
</details>
<details>
<summary>서비스 보안</summary>
<div markdown="1">       
  1. {토글리스트의 content}
 <br>
  2. {토글리스트의 content}
</div>
</details>
<details>
<summary>서버 성능</summary>
<div markdown="1">       
  1. {토글리스트의 content}
 <br>
  2. {토글리스트의 content}
</div>
</details>

<details>
<summary><strong>이미지가 늦게 업로드되는 문제</strong></summary>
  <br/>
  <ul>
<li><strong>문제상황</strong>
<p>- 유저테스트 결과, 이미지 업로드가 너무 오래 걸려서 제대로 작동하지 않는 것 같다는 의견이 있었습니다.    
<li><strong>원인</strong>
<p>- 이미지 용량이 큰 경우, 업로드가 오래 걸리는 현상임을 확인했습니다.
<li><strong>해결방안</strong>
    <br/>
    <br/>
<img src="https://family-8.s3.ap-northeast-2.amazonaws.com/photo/1653742820337blob" />
    <br/>
    <img src="https://family-8.s3.ap-northeast-2.amazonaws.com/photo/1653743034190blob" />
    <img src="https://family-8.s3.ap-northeast-2.amazonaws.com/photo/1653742986577blob" />
    <br/>
    <p>- 이미지를 formdata로 변환하기 이전에 압축해서 서버로 전달하기로 결정했습니다.
<p>- 적합한 라이브러리를 찾던 중 browser-image-compression이라는 라이브러리를 사용하여 이미지를 압축할 수 있었습니다.
<p>- 유저가 이미지가 업로드되는 상황을 인지할 수 있도록 돕기 위해 사진추가버튼에 스피너를 적용하였습니다.    
<li><strong>결과</strong>
<p>-

<br>

## 👾 팀원 소개
| Name     | GitHub                             | Position  |
| -------- | ---------------------------------- | --------- |
| 이미란🔰   | https://github.com/doremilan          | 백엔드 |
| 성영호   | https://github.com/Hoya11           | 백엔드 |
| 서현우   | https://github.com/SEOCL       | 백엔드 |
| 김정태🔰   | https://github.com/Jayteeee        | 프론트엔드     |
| 이덕행   | https://github.com/Deokhaeng         | 프론트엔드     |
| 정주현   | -                                   | 디자인     |
| 윤혜원   | -                                   | 디자인     |
