const SocketIO = require("socket.io");
// const ios = require('express-socket.io-session');
const User = require("./schemas/user");
const Alert = require("./schemas/alert");
const Connect = require("./schemas/connect");

// 알림 등록 시간 체크
function timeForToday(createdAt) {
  const today = new Date();
  const timeValue = new Date(createdAt);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  ); // 분
  if (betweenTime < 1) return "방금 전"; // 1분 미만이면 방금 전
  if (betweenTime < 60) return `${betweenTime}분 전`; // 60분 미만이면 n분 전

  const betweenTimeHour = Math.floor(betweenTime / 60); // 시
  if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`; // 24시간 미만이면 n시간 전

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24); // 일
  if (betweenTimeDay < 7) return `${betweenTimeDay}일 전`; // 7일 미만이면 n일 전
  if (betweenTimeDay < 365)
    return `${timeValue.getMonth() + 1}월 ${timeValue.getDate()}일`; // 365일 미만이면 년을 제외하고 월 일만

  return `${timeValue.getFullYear()}년 ${
    timeValue.getMonth() + 1
  }월 ${timeValue.getDate()}일`; // 365일 이상이면 년 월 일
}

module.exports = (server) => {
  const io = SocketIO(server, {
    cors: {
      origin: "*",
    },
  });

  let onlineUsers = [];
  const addNewUser = (userId, socketId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
  };

  // 소켓 연결
  io.on("connection", (socket) => {
    console.log("소켓 연결 성공", socket.id);

    socket.on("newUser", async ({ userId }) => {
      if (userId !== undefined) {
        addNewUser(userId, socket.id);
        const receiver = getUser(userId);
        const createdAt = new Date();
        const userFind = await Connect.findOne({ userId });
        if (!userFind) {
          await Connect.create({
            userId: userId,
            connected: true,
            socketId: receiver.socketId,
            connectedAt: createdAt,
          });
        } else {
          await Connect.updateOne(
            { userId },
            {
              $set: {
                connected: true,
                socketId: receiver.socketId,
                connectedAt: createdAt,
              },
            }
          );
          await Connect.findOne({ userId });
        }
      }
    });

    // 가족 멤버 초대
    socket.on(
      "inviteMember",
      async ({
        familyId,
        selectEmail,
        familyMemberNickname,
        nickname,
        type,
      }) => {
        console.log(
          4,
          familyId,
          selectEmail,
          familyMemberNickname,
          nickname,
          type
        );
        const findUser = await User.findOne({ email: selectEmail });
        const chkAlertDB = await Alert.findOne({ familyId, selectEmail, type });
        const userId = findUser.userId;
        const createdAt = new Date();
        // DB 생성
        if (!chkAlertDB) {
          await Alert.create({
            familyId,
            userId: findUser.userId,
            familyMemberNickname,
            selectEmail,
            category: "가족 초대",
            type: "초대",
            nickname,
            createdAt,
          });
          const findUserAlertDB = await Alert.findOne({
            userId,
            type,
            selectEmail,
          });
          findUserAlertDB.createdAt = timeForToday(createdAt);
          console.log(findUserAlertDB.createdAt);
          const receiver = getUser(userId);
          // 데이터 전송
          io.to(receiver.socketId).emit("newInviteDB", {
            findUserAlertDB: [findUserAlertDB],
          });
        } else {
          socket.emit("errorMsg", "이미 초대한 가족입니다.");
          return;
        }
      }
    );

    //가족 초대 수락
    socket.on("getMyAlert", async ({ userId, type }) => {
      console.log(5, userId, type);
      if (userId && type) {
        const receiver = getUser(userId);
        const findUserAlertDB = await Alert.find({ userId, type });
        if (findUserAlertDB.length) {
          for (let findUserDB of findUserAlertDB) {
            findUserDB.createdAt = timeForToday(findUserDB.createdAt);
          }
          io.to(receiver.socketId).emit("newInviteDB", {
            findUserAlertDB: findUserAlertDB,
          });
        }
      }
    });

    // 좋아요 실시간 알림
    socket.on(
      "sendLikeNoti",
      async ({
        photoId,
        senderName,
        senderId,
        receiverId,
        type,
        category,
        likeChk,
      }) => {
        console.log(
          1,
          photoId,
          senderName,
          senderId,
          receiverId,
          type,
          category,
          likeChk
        );
        // DB 생성
        if (
          senderName !== undefined &&
          senderId !== undefined &&
          senderId !== receiverId
        ) {
          const createdAt = new Date();
          if (likeChk) {
            await Alert.create({
              photoId,
              senderName,
              receiverId,
              type,
              category,
              createdAt,
            });
          } else {
            await Alert.deleteOne({ photoId, receiverId, type });
          }
          // 데이터 전송
          if (likeChk) {
            const findAlertDB = await Alert.find({ receiverId });
            for (let alert of findAlertDB) {
              alert.createdAt = timeForToday(createdAt);
            }
            const receiver = getUser(receiverId);
            io.to(receiver.socketId).emit("getNotification", {
              findAlertDB,
            });
          }
        }
      }
    );

    // 댓글 실시간 알림
    socket.on(
      "sendCommentNoti",
      async ({ photoId, senderName, senderId, receiverId, type, category }) => {
        console.log(
          2,
          photoId,
          senderName,
          senderId,
          receiverId,
          type,
          category
        );
        // DB 생성
        if (
          senderName !== undefined &&
          senderId !== undefined &&
          senderId !== receiverId
        ) {
          const createdAt = new Date();
          await Alert.create({
            photoId,
            senderName,
            receiverId,
            type,
            category,
            createdAt,
          });
          // 데이터 전송
          const receiver = getUser(receiverId);
          const findAlertDB = await Alert.find({ receiverId });
          for (let alert of findAlertDB) {
            alert.createdAt = timeForToday(createdAt);
          }
          io.to(receiver.socketId).emit("getNotification", {
            findAlertDB,
          });
        }
      }
    );

    // 댓글 & 좋아요 알림
    socket.on("getPhotoAlert", async ({ receiverId }) => {
      console.log(3, receiverId);
      if (receiverId !== undefined) {
        const receiver = getUser(receiverId);
        const findUserAlertDB = await Alert.find({ receiverId });
        if (findUserAlertDB) {
          for (let alertDB of findUserAlertDB) {
            alertDB.createdAt = timeForToday(alertDB.createdAt);
          }
          io.to(receiver.socketId).emit("getNotification", {
            findAlertDB: findUserAlertDB,
          });
        }
      }
    });

    // 알림 삭제
    socket.on("deleteAlert", async (alertId) => {
      console.log("deleteAlert", alertId);
      await Alert.deleteOne({ _id: alertId });
    });

    // 로그아웃 시 연결 해제
    socket.on("imOut", async (userId) => {
      const socketUserId = userId.userId;
      const userFind = await Connect.findOne({ userId: socketUserId });
      const createdAt = new Date();
      if (userFind) {
        await Connect.updateOne(
          { userId: socketUserId },
          { $set: { connected: false, connectedAt: createdAt } }
        );
      }
      removeUser(userId);
      console.log("로그아웃 소켓 연결해제", userId);
    });

    // 소켓 연결 해제
    socket.on("disconnect", async () => {
      const userFind = await Connect.findOne({ socketId: socket.id });
      const createdAt = new Date();
      if (userFind) {
        await Connect.updateOne(
          { socketId: socket.id },
          { $set: { connected: false, connectedAt: createdAt } }
        );
      }
      removeUser(socket.id);
      console.log("소켓 연결해제", socket.id);
    });
  });
};
