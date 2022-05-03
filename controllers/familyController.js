const express = require("express");
const router = express.Router();
const Family = require("../schemas/family");
const FamilyMember = require("../schemas/familyMember");

//가족 생성 API
const createFamily = async (req, res) => {
  try {
    const { familyTitle } = req.body;
    const { user } = res.locals.user;
    const { userId, familyHost } = user[0].userId;

    await Family.create({
      familyTitle,
      familyHost,
    });

    res.status(200).send({ msg: "가족이 생성되었습니다." });
  } catch (error) {
    console.log("가족 생성에서 오류!", error);
    res.status(400).send({ msg: "가족 생성에 실패했습니다." });
  }
};

//가족 구성원 생성 api
const createFamilyMember = async (req, res) => {
  try {
    const [familyMemberNickname] = req.body;
    const { user } = res.locals.user;
    const { familyId } = req.params;
    const userId = user[0].userId;

    await FamilyMember.create({
      familyId,
      familyMemberNickname,
      userId,
    });

    res.status(201).send({ restult: true });
  } catch (error) {
    console.log("멤버 검색에서 오류!", error);
    res.status(400).send({ result: false });
  }
};

//멤버 검색 API
const familyMemberCheckmodal = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { userId } = res.locals;
    console.log("req.query-->", keyword);

    const regex = (pattern) => new RegExp(`.*${pattern}.*`);
    const titleRegex = regex(search);
    let searchKeyword = await FamilyMember.find({
      $or: [
        { userId: { $regex: titleRegex, $options: "i" } },
        { email: { $regex: titleRegex, $options: "i" } },
        { userNickname: { $regex: titleRegex, $options: "i" } },
      ],
    });

    console.log("searchKeyword-->", searchKeyword);
    res.status(200).send({
      searchKeyword,
    });
  } catch (error) {
    console.log("멤버 검색에서 오류!", error);
    res.status(400).send({ result: false });
  }
};

//가족구성원 조회 API
const getfamilyMember = async (req, res) => {
  try {
    const familyId = req.params;
    const { user } = res.locals.user;
    const userId = user[0].userId;

    let familyMemberList = await FamilyMember.findO({});

    for (let family of familyMemberList) {
      let userInfo = await Family.findOne({
        familyId: userId.familyId,
      });
      family.userInfo = userInfo;
    }
    //find로 찾아오면 무조건 배열 형태. 배열의 특징은 그 속의 각 요소가 ','로 구분되어 있음.***
    //familyMemberList 첫 번째, 두 번재...등의 요소를 순서대로 family에 임시 할당을 해 줌.

    res.status(200).send({ familyMemberList });
  } catch (error) {
    console.log("가족 구성원 조회에서 오류!", error);
    res.status(400).send({ result: false });
  }
};

//가족 이름 수정 API
const editFamilyTitle = async (req, res) => {
  try {
    const familyId = req.params;
    const familyTitle = req.body;
    const { user } = res.locals.user;
    const { userId } = user[0].userId;

    console.log(req.familyId);

    const modifyFamilyTitle = await Family.updateOne(
      { familyId },
      { $set: { familyTitle } }
    );

    console.log(familyId);
    console.log(familyTitle);

    res.status(200).send({
      familyId,
      modifyFamilyTitle,
    });
  } catch (error) {
    console.log("가족 이름 수정에서 오류!", error);
    res.status(400).send({
      result: false,
    });
  }
};

//가족 구성원 수정 API
const editFamilyMember = async (req, res) => {
  try {
    const { familyMemberId } = req.params;
    const { familyMemberNickname } = req.body;
    const { user } = res.locals.user;
    const userId = user[0].userId;

    console.log(familyMemberId);
    console.log(familyMemberNickname);

    await FamilyMember.updateOne(
      { familyMemberId },
      { $set: { familyMemberNickname } }
    );

    const afterEditFamilyMemberList = FamilyMember.find({});

    console.log("변경 이후", familyMemberNickname);

    res.status(200).send(afterEditFamilyMemberList);
  } catch (error) {
    console.log("가족 구성원 수정에서 오류!", error);
    res.status(400).send({ result: false });
  }
};

//가족 삭제 API
const deleteFamily = async (req, res) => {
  try {
    const { familyId } = req.params;
    const { userId } = res.locals;

    await Family.deleteMany({ familyId });

    res.status(200).send({ msg: "가족이 지워졌습니다." });
  } catch (error) {
    console.log("가족 삭제에서 오류!", error);
    res.status(400).send({ msg: "가족 삭제에 실패했습니다." });
  }
};

//가족 구성원 삭제 API
const deleteFamilyMember = async (req, res) => {
  try {
    const { familyMemberId } = req.params;
    const { user } = res.locals.user;
    const { userId } = user[0].userId;

    await FamilyMember.deleteMany({ familyMemberId });

    res.status(200).send({ msg: "가족 구성원이 삭제됐습니다" });
  } catch (error) {
    console.log("가족 구성원 삭제에서 오류!", error);
    res.status(400).send({ result: false });
  }
};

module.exports = {
  createFamily,
  createFamilyMember,
  familyMemberCheckmodal,
  getfamilyMember,
  editFamilyTitle,
  editFamilyMember,
  deleteFamily,
  deleteFamilyMember,
}
