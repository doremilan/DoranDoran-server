const httpMocks = require("node-mocks-http")
const authMiddleware = require("../middlewares/authMiddleware")
const faker = require("@faker-js/faker")
const jwt = require("jsonwebtoken")
const User = require("../schemas/user")

jest.mock("jsonwebtoken")
jest.mock("../schemas/user")

describe("Auth Middleware", () => {
  it("returns 401 for the request without Authorization header", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/mission",
    })
    const response = httpMocks.createResponse()
    const next = jest.fn()

    await authMiddleware(request, response, next)

    expect(response.statusCode).toBe(401)
    expect(next).not.toBeCalled()
  })

  it("returns 401 for the request with unsupported Authorization header", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/mission",
      headers: { Authorization: "Basic" },
    })
    const response = httpMocks.createResponse()
    const next = jest.fn()

    await authMiddleware(request, response, next)

    expect(response.statusCode).toBe(401)
    expect(next).not.toBeCalled()
  })

  it("returns 401 for the request with invalid JWT", async () => {
    const tokenValue = faker.random.alphaNumeric(126)
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/mission",
      headers: { Authorization: `Bearer ${tokenValue}` },
    })
    const response = httpMocks.createResponse()
    const next = jest.fn()
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(new Error("bad token"), undefined)
    })

    await authMiddleware(request, response, next)

    expect(response.statusCode).toBe(401)
    expect(next).not.toBeCalled()
  })

  // it("returns 401 when cannot find a user by id from the JWT", async () => {
  //   const token = faker.random.alphaNumeric(128)
  //   const userId = faker.random.alphaNumeric(32)
  //   const request = httpMocks.createRequest({
  //     method: "GET",
  //     url: "/tweets",
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //   const response = httpMocks.createResponse()
  //   const next = jest.fn()
  //   jwt.verify = jest.fn((token, secret, callback) => {
  //     callback(undefined, { id: userId })
  //   })
  //   userRepository.findById = jest.fn((id) => Promise.resolve(undefined))

  //   await isAuth(request, response, next)

  //   expect(response.statusCode).toBe(401)
  //   expect(response._getJSONData().message).toBe("Authentication Error")
  //   expect(next).not.toBeCalled()
  // })

  // it("passes a request with valid Authorization header with token", async () => {
  //   const token = faker.random.alphaNumeric(128)
  //   const userId = faker.random.alphaNumeric(32)
  //   const request = httpMocks.createRequest({
  //     method: "GET",
  //     url: "/tweets",
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //   const response = httpMocks.createResponse()
  //   const next = jest.fn()
  //   jwt.verify = jest.fn((token, secret, callback) => {
  //     callback(undefined, { id: userId })
  //   })
  //   userRepository.findById = jest.fn((id) => Promise.resolve({ id }))
  //   await isAuth(request, response, next)

  //   expect(request).toMatchObject({ userId, token })
  //   expect(next).toHaveBeenCalledTimes(1)
  // })
})
