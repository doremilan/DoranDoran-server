// 이번달 미션 목록조회  (이번달 미션 목록 안에 각 미션들의 로그인한 유저의 미션 체크값 넣어주기)
const getMission = async (req, res) => {
  const { familyId } = req.params
  const { userId } = res.locals.user

  try {
    // 이번달 미션 리스트 & 전체 미션 수 추출
    const thisMonth = new Date().toISOString().substring(0, 7).replace(/-/g, "")
    const missions = await Mission.find({ familyId }).sort("-createdAt")
    const thisMonthMissionList = []
    let totalMission = 0
    let completedMission = 0
    if (missions.length) {
      for (let mission of missions) {
        if (
          mission.createdAt.toISOString().substring(0, 7).replace(/-/g, "") ===
          thisMonth
        ) {
          thisMonthMissionList.push(mission)
          totalMission++
        }
      }
    }
    // 각 미션의 멤버 리스트 추출
    if (thisMonthMissionList.length) {
      for (let mission of thisMonthMissionList) {
        const missionMembers = await MissionMember.find({
          missionId: mission.missionId,
        })
        mission.missionMemberList = missionMembers
        for (let missionMember of missionMembers) {
          mission.myMissionChk = false
        }
        // 해당 유저의 각 미션 달성 여부 체크
        const completedMembers = await MissionChk.find({
          missionId: mission.missionId,
        })
        for (let completedMember of completedMembers) {
          if (completedMember.userId === userId) {
            mission.myMissionChk = true
          }
        }
        // 각 미션 전체 달성완료 여부 체크 & 완료된 미션 수 추출
        let familyMissionChk = false
        if (missionMembers.length === completedMembers.length) {
          familyMissionChk = true
          mission.familyMissionChk = familyMissionChk
          completedMission++
        } else {
          familyMissionChk = false
          mission.familyMissionChk = familyMissionChk
        }
        // 각 멤버의 미션완료 여부 체크
        let myMissionChk = false
        // 완료멤버가 없을 시 예외처리 (빈 객체 속성을 배열로 바꿔서 체크)
        if (Object.keys(completedMembers).length === 0) {
          missionMembers.map((missionMember) => {
            myMissionChk = false
            missionMember.myMissionChk = myMissionChk
          })
        }
        missionMembers.filter((missionMember) => {
          completedMembers.forEach((completedMember) => {
            if (
              completedMember.familyMemberId === missionMember.familyMemberId
            ) {
              myMissionChk = true
              missionMember.myMissionChk = myMissionChk
              // 중복체크 예외처리
            } else if (missionMember.myMissionChk === true) {
              missionMember.myMissionChk === true
            } else if (
              completedMember.familyMemberId !== missionMember.familyMemberId
            ) {
              myMissionChk = false
              missionMember.myMissionChk = myMissionChk
            }
          })
        })
      }
    }

    // 미션 달성률 계산
    const Percentage = (completedMission / totalMission) * 100
    let completePercentage = Math.floor(Percentage)
    // NaN일 경우 예외처리 (0으로 반환)
    if (!Percentage) {
      completePercentage = 0
    }

    // 총 배지 획득 수 조회
    const badgeList = await Badge.findOne({ familyId })
    // console.log(badgeList);
    const badges = badgeList.badge
    let totalBadge = 0
    for (let badge of badges) {
      //1번 배지 상태조회
      if (badge.badgeTitle === "단란한 시작") {
        totalBadge++
      }
      // 2번 배지 상태조회
      if (badge.badgeTitle === "추억의 발자국") {
        const existPhoto = await Photo.find({ familyId })
        if (existPhoto.length >= 15) {
          totalBadge++
        }
      }
      // 3번 배지 상태조회
      if (badge.badgeTitle === "정겨운 목소리") {
        const existVoiceFile = await VoiceFile.find({ familyId })
        if (existVoiceFile.length >= 10) {
          totalBadge++
        }
      }
      // 4번 배지 상태조회
      if (badge.badgeTitle === "협동의 즐거움") {
        const existMission = await Mission.find({ familyId })
        if (existMission.length >= 20) {
          totalBadge++
        }
      }
      // 5번 배지 상태조회
      if (badge.badgeTitle === "소통의 기쁨") {
        const existComment = await Comment.find({ familyId })
        if (existComment.length >= 50) {
          totalBadge++
        }
      }
      // 6번 배지 상태조회
      if (badge.badgeTitle === "함께하는 나날") {
        const existEvent = await Event.find({ familyId })
        if (existEvent.length >= 5) {
          totalBadge++
        }
      }
    }
    res.status(200).json({
      totalMission,
      completedMission,
      completePercentage,
      totalBadge,
      thisMonthMissionList,
    })
  } catch (error) {
    console.log("미션 목록조회 오류", error)
    res.status(400).send({
      result: false,
      msg: "미션 목록조회 실패",
    })
  }
}
