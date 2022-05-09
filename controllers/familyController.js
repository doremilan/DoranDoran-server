const Family = require('../schemas/family')
const FamilyMember = require('../schemas/familyMember')
const User = require('../schemas/user')
const Mission = require('../schemas/mission')
const Badge = require('../schemas/badge')
const Comment = require('../schemas/comment')
const Event = require('../schemas/event')
const Photo = require('../schemas/photo')
const PhotoAlbum = require('../schemas/photoAlbum')
const VoiceAlbum = require('../schemas/voiceAlbum')
const VoiceFile = require('../schemas/voiceFile')
const Like = require('../schemas/like')
const MissionMember = require('../schemas/missionMember')
const MissionChk = require('../schemas/missionChk')
const Joi = require('joi')

const familySchema = Joi.object({
  familyTitle: Joi.string()
    .max(8)
    .pattern(new RegExp('^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣+]*$'))
    .required(),
})
// 최대 8 자 / 숫자,영어,한글만 가능 / 특수문자 불가능/ 띄어쓰기 불가.

const familyMemberSchema = Joi.object({
  familyMemberNickname: Joi.string().min(2).max(8).required(),
})
// 2~8자

//가족 생성 API
//api 테스트 성공
const createFamily = async (req, res) => {
  try {
    const { user } = res.locals

    console.log('가족 생성의 user-->', user)

    let { familyTitle } = await familySchema.validateAsync(req.body)

    const newFamily = await Family.create({
      familyTitle,
      familyHost: user.userId,
    })

    const familyHost = await FamilyMember.create({
      familyId: newFamily.familyId,
      familyMemberNickname: user.nickname,
      userId: user.userId,
      profileImg: user.profileImg,
    })

    // 배지 자동생성
    await badge.create({
      familyId: newFamily.familyId,
      badge: [
        {
          badgeChk: false,
          badgeTitle: '단란한 시작',
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: '추억의 발자국',
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: '정겨운 목소리',
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: '협동의 즐거움',
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: '소통의 기쁨',
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: '함께하는 나날',
          badgeCnt: 0,
        },
      ],
    })

    console.log('familyHost-->', familyHost)

    res.status(200).json({ msg: '가족이 생성되었습니다.' })
  } catch (error) {
    console.log('가족 생성에서 오류!', error)
    res.status(400).send({ msg: '가족 생성에 실패했습니다.' })
  }
}

//가족 구성원 생성 api
//api 테스트 성공
const createFamilyMember = async (req, res) => {
  try {
    const { familyId } = req.params
    const { user } = res.locals
    const { email } = req.body
    let { familyMemberNickname } = await familyMemberSchema.validateAsync(
      req.body
    )

    const findMmemberUser = await User.findOne({ email })
    const userId = findMmemberUser.userId
    const profileImg = findMmemberUser.profileImg

    console.log('familyId-->', familyId)
    console.log('familyMemberNickname-->', familyMemberNickname)
    console.log('userId-->', userId)
    console.log('profileImg-->', profileImg)

    await FamilyMember.insertMany({
      familyId: familyId,
      familyMemberNickname: familyMemberNickname,
      userId: userId,
      profileImg: profileImg,
    })

    res.status(201).json({ restult: true })
  } catch (error) {
    console.log('멤버 생성에서 오류!', error)
    res.status(400).send({ result: false })
  }
}

//멤버 검색 API
//api 테스트 성공.
const searchUser = async (req, res) => {
  try {
    const { search } = req.query
    console.log('req.query-->', search)

    const regex = (pattern) => new RegExp(`.*${pattern}.*`)
    //RegExp 생성자는 패턴을 사용해 텍스트를 판별할 때 사용
    //$ = 텍스트(문자열)의 끝과 일치하는 지.
    //^ = 텍스트의 첫 자와 일치하는 지를 보는 정규식 표현.
    //세세한 패턴 수정 필요
    //산토끼를 완성 검색하면 토끼는 안 나옴. 토끼를 검색하면 산토끼는 나옴.

    const userRegex = regex(search)

    const searchKeyword = await User.find({
      $or: [{ email: { $regex: userRegex, $options: 'i' } }],
    })

    console.log('searchKeyword-->', searchKeyword)

    res.status(200).json({
      email: searchKeyword[0].email,
      nickname: searchKeyword[0].nickname,
    })

    // console.log("searchKeyword.email-->" , searchKeyword.email )
    // console.log("searchKeyword.nickname-->" , searchKeyword.nickname )
  } catch (error) {
    console.log('멤버 검색에서 오류!', error)
    res.status(400).send({ result: false })
  }
}

//가족구성원 조회 API
//api 테스트 성공
const getfamilyMember = async (req, res) => {
  try {
    const { familyId } = req.params
    const { user } = res.locals
    const familyMemberList = await FamilyMember.find({ _id: familyId })

    res.status(200).json({ familyMemberList })
  } catch (error) {
    console.log('가족 구성원 조회에서 오류!', error)
    res.status(400).send({ result: false })
  }
}

//가족 이름 수정 API
//api 테스트 성공
const editFamilyTitle = async (req, res) => {
  try {
    const { familyId } = req.params
    const { familyTitle } = await familySchema.validateAsync(req.body)
    const { email } = res.locals.user

    await Family.updateOne({ email, _id: familyId }, { $set: { familyTitle } })

    console.log('_id:familyId-->', familyId)

    res.status(200).json({
      familyId,
      familyTitle,
    })
  } catch (error) {
    console.log('가족 이름 수정에서 오류!', error)
    res.status(400).send({
      result: false,
    })
  }
}

//가족 구성원 수정 API
//api 테스트 성공
const editFamilyMember = async (req, res) => {
  try {
    const { familyId, familyMemberId } = req.params
    let { familyMemberNickname } = await familyMemberSchema.validateAsync(
      req.body
    )
    const { email } = res.locals.user

    await FamilyMember.updateOne(
      { email, _id: familyId, _id: familyMemberId },
      { $set: { familyMemberNickname } }
    )

    const modifyFamilyMemberList = await FamilyMember.find({
      _id: familyId,
      _id: familyMemberId,
    })

    res.status(200).json({ modifyFamilyMemberList })
  } catch (error) {
    console.log('가족 구성원 수정에서 오류!', error)
    res.status(400).send({ result: false })
  }
}

//가족 삭제 API
//api 테스트 성공
//familyId 로 연관된 갤러리, 보이스, 미션 등등이 다 삭제되게 하기.
//like, missionChk, MissionMember 세 개 다 familyId 따로 추가 예정.
//user, randomMsg 데이터는 삭제 제외.
const deleteFamily = async (req, res) => {
  try {
    const { familyId } = req.params
    const { email } = res.locals.user

    console.log('삭제 email-->', email)
    console.log('삭제 familyId-->', familyId)

    await Family.deleteOne({ _id: familyId })
    await FamilyMember.deleteMany({ _id: familyId })
    await Mission.deleteMany({ _id: familyId })
    await Badge.deleteMany({ _id: familyId })
    await Comment.deleteMany({ _id: familyId })
    await Event.deleteMany({ _id: familyId })
    await Photo.deleteMany({ _id: familyId })
    await PhotoAlbum.deleteMany({ _id: familyId })
    await VoiceAlbum.deleteMany({ _id: familyId })
    await VoiceFile.deleteMany({ _id: familyId })
    await Like.deleteMany({ _id: familyId })
    await MissionMember.deleteMany({ _id: familyId })
    await MissionChk.deleteMany({ _id: familyId })

    res.status(200).json({ msg: '가족이 삭제됐습니다.' })
  } catch (error) {
    console.log('가족 삭제에서 오류!', error)
    res.status(400).send({ msg: '가족 삭제에 실패했습니다.' })
  }
}

//가족 구성원 삭제 API
//api 테스트 성공
const deleteFamilyMember = async (req, res) => {
  try {
    const { familyMemberId } = req.params
    const { email } = res.locals.user

    console.log('삭제 email-->', email)
    console.log('삭제 familyMemberId-->', familyMemberId)
    await FamilyMember.deleteOne({ _id: familyMemberId })

    res.status(200).json({ msg: '가족 구성원이 삭제됐습니다' })
  } catch (error) {
    console.log('가족 구성원 삭제에서 오류!', error)
    res.status(400).send({ result: false })
  }
}

module.exports = {
  createFamily,
  createFamilyMember,
  searchUser,
  getfamilyMember,
  editFamilyTitle,
  editFamilyMember,
  deleteFamily,
  deleteFamilyMember,
}
