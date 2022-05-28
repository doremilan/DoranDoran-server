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
| artillery	          |  퍼포먼스 테스팅 툴      |2.0.0-17|
|express-rate-limit   | DDos 보안      |2.0.0-17|

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

   

   
## 🔥 트러블 슈팅
<details>
<summary><strong>사용자 편의</strong></summary>
   <br/>
   <ul>
      
<details>
<summary><strong>음성메세지 파일변환</strong></summary>
   <ul>
<div markdown="1">       
<li> 
   <strong><p>음성메세지 녹음 시 IOS 기기에서 녹음 및 재생이 불가능한 문제점 발견</strong>
 <br>
<li>
   <strong><p>초기에 저장되던 녹음파일 형식 : webm/Opus </strong>
   <p><h6>- WebM은 기본적으로 Firefox, Chrome 및 Opera에서만 재생됨
   <p>- macOS 및 iOS의 IE 및 Safari는 내장 지원을 제공하지 않음을 확인</h6>
   <p>
      <br>
   <img src="https://user-images.githubusercontent.com/88309582/170833946-cc8de5e4-f198-4c21-847b-4639aa64e19f.png" />

<li>
   <strong><p>iOS에서 지원하는 오디오 포멧 : AAC, MP3, WAV, AIFF </strong>
   <p><h6>- 사용자가 기기에 상관없이 모든 기능을 이용할 수 있게 ffmpeg 라이브러리의 컨버팅 기능을 이용해 
   <p>프론트엔드에서 받은 WepM파일을 mp3확장자로 컨버팅 후 저장하여 문제를 해결함</h6>
   <p> 
      <br>
   
   <img src="https://user-images.githubusercontent.com/88309582/170834252-cfb8d204-36eb-4b21-bb77-04859a002d1f.png" />
<br>
</div>
   
</details>
   <details>
<summary><strong>Socket.io </strong></summary>
   <ul>
<div markdown="1">       
<li> 
   <strong><p> MVP 기능 구현 중, 누구나 email 검색을 통해 가족원으로 추가될 수 있는 가족 구성 방식의 문제점 발견</strong>
   <br>
   <p><h6>- 가족 구성원 추가 시, 실시간 초대 알림메시지를 통해 승락/거부 기능을 구현하여 해결하기로 함
   <p>- websocket 대신 모든 브라우저에서 사용 가능한 socket.io 라이브러리 도입 결정</h6>
 <br>
      
<li>
   <strong><p>Socket.io 구현 중 발생한 에러</strong>
   <p><h6>- 로컬에서 소켓연결 및 작동테스트를 확인하고 서버에 올려 클라이언트와 연동 중 웹소켓 연결실패 에러 발생
   <p>- 확인해본 결과 리버스 프록시 용으로 설치해놓은 Nginx의 설정 관련 문제로 파악</h6>
   <p>
   <br>
   <img src="https://user-images.githubusercontent.com/88309582/170837994-4ea39149-1af1-4ec8-85ea-1069ed8b7876.png" />
    
<li>
   <strong><p>socket.io 관련 Nginx 설정 추가 및 변경 </strong>
   <p><h6>- Nginx는 기본적으로 HTTP 요청을 upstream 서버로 프록시할 때 HTTP 버전을 1.0으로 바꿔서 보냄 (1.1버전으로 와야됨)<br>
   <p>- 이 과정에서 Connection 헤더도 close로 바꾸는 것으로 확인함 <br>
   <p>- Nginx 설정파일에 위 2개의 사항을 추가해서 해결함</h6>
   <p>
   <br>
   <img src="https://user-images.githubusercontent.com/88309582/170838014-573c2c97-7ed6-4960-bdcd-b5004bf95b2e.png" />
   <br>
   <p><h6>- Nginx Keep Alive 설정 추가 <br>
   <p>- socket 연결 방식은 3way handshake 방식 ->IN/OUT access 시간을 늘려주어, 리소스 소모량을 감소시키고 웹페이지 로드 속도를 높임</h6>
   <p>
   <br>
   <img src="https://user-images.githubusercontent.com/88309582/170839456-506d0831-ddb3-49d8-9e63-f7b531951803.png" />
<br>

</div>
   
</details>
</details>

<details>
<summary><strong>보안성</strong></summary>
  <br/>
  <ul>
<li><strong>아이폰 유저를 위한 파일변환 기능 구현</strong>
<p>- 음성메세지 녹음 시 IOS 기기에서 녹음 및 재생이 불가능한 문제점 발견
<p>- 음성메세지 녹음 시 IOS 기기에서 녹음 및 재생이 불가능한 문제점 발견
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

<br>
* * *

   
