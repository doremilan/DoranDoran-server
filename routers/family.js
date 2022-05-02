const express = require("express");
const router = express.Router();
const Family = require("../schemas/family")
const FamilyMember = require("../schemas/familyMember")
const authMiddleware = require("../middlewares/authMiddleware");
const user = require("../schemas/user");

//가족 생성 API
router.post('/family', authMiddleware, async (req, res) => {
    try{
    const {familyTitle} = req.body
    const {user} = res.locals.user
    const {userId} = user[0].userId
    const {familyHostNickname} = user[0].nickname 
    const {familyHost} = await FamilyMember.create({
        familyId,
        familyHostNickname,
        userId
    })

    await Family.create({
        familyTitle,
        familyHost
    })

    res.status(200).send({ msg: "가족이 생성되었습니다." })
    }
    catch (error){
    res.status(400).send({ msg: "가족 생성에 실패했습니다."})
    }
})

//가족 구성원 생성 api
router.post('/family/:familyId', authMiddleware, async (req, res) => {
    try{
    const [familyMemberNickname] = req.body
    const {user} = res.locals.user
    const {familyId} = req.params
    const userId = user[0].userId

    await FamilyMember.create({
        familyId,
        familyMemberNickname,
        userId
    })

    res.status(201).send({ restult: true })
    }
    catch(error){
        res.status(400).send({ result: false })
    }
})

//멤버 이메일 검색 API
router.get('/family/search/keyword?keyword="userId'), authMiddleware, async (req, res) =>{
        const {keyword} = req.query
        console.log('req.query'--> keyword )

        const regex = (pattern) => new RegExp(`.*${pattern}.*`);
	    const titleRegex = regex(search);
	    let searchKeyword = await FamilyMember.find({ $or : [
		{'userId' : { $regex: titleRegex, $options : 'i' }},
		{'userNickname' : { $regex: titleRegex, $options : 'i' }}]
        });

        console.log('searchKeyword-->' ,searchKeyword)
        res.status(200).send({
            searchKeyword
        })  
};

//가족구성원 조회 API
router.get('/family/:familyId/familymember'), authMiddleware, async (req, res) =>{
    try{
        const familyId = req.params
        let familyMemberList = await FamilyMember.find({})

        for (let family of familyMemberList ) {
            let userInfo = await Family.findOne({
                familyId: user.familyId
            });
            family.userInfo = userInfo
        }
        //find로 찾아오면 무조건 배열 형태. 배열의 특징은 그 속의 각 요소가 ','로 구분되어 있음.***
        //familyMemberList 첫 번째, 두 번재...등의 요소를 순서대로 family에 임시 할당을 해 줌.

        res.status(200).send({ familyMemberList })
    }
    catch(error){ 
        res.status(400).send({ result: false })
    }
}

//가족 이름 수정  API
router.put('family/:familyId'), authMiddleware, async (req, res) => {
    try{
        const familyId = req.params
        const familyTitle = req.body
        const {user} = res.locals;

        console.log(req.familyId)

        const modifyFamilyTitle = await Family.updateOne({familyId}, {$set:{familyTitle}});

        console.log(familyId)
        console.log(familyTitle)

        res.status(200).send({
        familyId,
        modifyFamilyTitle
        })
    } catch(error) {
        res.status(400).send({
            result: false
        })

    }
};

//가족 구성원 수정 API
router.put('/:familyId/:familyMemberId'), authMiddleware, async, (req, res) => {
    try{
        const {familyId, familyMemberId} = req.params
        const {familyMemberNickname} = req.body
        const {user} = res.locals;

        console.log(familyId, familyMemberId)
        console.log(familyMemberNickname)

        const modifyFamilyMemberNickname = await FamilyMember.updateOne({familyId, familyMemberId}, {$set:{familyMemberNickname}});

        console.log('변경 이후', familyMemberNickname)

        res.status(200).send({
            modifyFamilyMemberNickname
        })

    } catch(error){

    }

}

module.exports = router;
