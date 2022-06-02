const userController = require("../controllers/userController")
const httpMocks = require("node-mocks-http")
const User = require("../schemas/user")
const Family = require("../schemas/family")
const FamilyMember = require("../schemas/familyMember")
const MissionMember = require("../schemas/missionMember")
const Event = require("../schemas/event")
const VoiceFile = require("../schemas/voiceFile")

////json으로 만든 가짜 프론트 req.body 데이터 값.
const isUser = require("../data/isUser.json")
const isMember = require("../data/isMember.json")
const isFamily = require("../data/isFamily.json")
const locals = require("../data/locals.json")
const photoFile = require("../data/photoFile.json")

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = null
  res.locals.user = locals
  req.file.location = photoFile
})

User.findOne = jest.fn()
User.create = jest.fn()
User.updateOne = jest.fn()
Family.findOne = jest.fn()
FamilyMember.find = jest.fn()
FamilyMember.updateMany = jest.fn()
Event.updateMany = jest.fn()
MissionMember.updateMany = jest.fn()
VoiceFile.updateMany = jest.fn()

describe("유저 조회", async () => {
  test("유저 정보 조회", () => {
    const { user } = locals
    user.password = "";

    const familyChk = await FamilyMember.find.mockResolvedValue(isMember)
      let familyList = []
      if (familyChk.length) {
        for (let family of familyChk) {
          const chechkedFamily = await Family.findOne.mockResolvedValue(isFamily)
          familyList.push(chechkedFamily)
        }
      }

    await userController.getUser(req, res, next)
    expect(res._getJSONData()).toStrictEqual({
        user,
        familyList,
      })
  })

  test("유저 프로필 조회", async () => {
    const { email } = locals
    const userInfo = await User.findOne(isUser)
    const nickname = userInfo.nickname;
    const profileImg = userInfo.profileImg;
    const todayMood = userInfo.todayMood;

    await userController.getProfile(req, res, next)
    expect(res._getJSONData()).toStrictEqual({
      nickname,
      profileImg,
      todayMood,
      })
  })
})

//photoFile 파일의 들어오는 형태 알아보기.
// describe("유저 데이터 편집", async() => {

//     test("유저 프로필 수정", async() => {
//         const { userId } = res.locals.userId
        
//     await userController.editProfile(req, res, next)
//     expect(res._getJSONData()).toStrictEqual({
//       nickname,
//       profileImg,
//       todayMood,
//       })
//     })
// })
