const auth = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passport = require("passport")
const User = require("../schemas/user")
const FamilyMember = require("../schemas/familyMember")
const Family = require("../schemas/family")
const RandomImg = require("../schemas/randomImg")
const config = require("../config")

test("회원가입 테스트 1", () => {
  expect().toBe()
})

test("회원가입 테스트 2", () => {
  expect().toBe()
})
