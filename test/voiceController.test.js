const httpMocks = require("node-mocks-http");
const voiceAlbumController = require("../controllers/voiceAlbumController");
const voiceAlbum = require("../schemas/voiceAlbum");
const voiceAlbumBody = require("./data/voiceAlbum-body.json");
const userLocals = require("./data/user-local.json");
const voiceAlbumList = require("./data/all-voiceAlbumList.json");
const User = require("../schemas/user");

jest.mock("../schemas/user");

voiceAlbum.create = jest.fn();
voiceAlbum.find = jest.fn();
let req, res, next;

beforeAll(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("voiceAlbum POST", () => {
  beforeEach(() => {
    req.body = voiceAlbumBody;
    res.locals.user = userLocals;
  });

  it("voiceAlbum Create function", () => {
    expect(typeof voiceAlbumController.createVoiceAlbum).toBe("function");
  });

  // Create 수정중

  // it("voiceAlbum create chk", async () => {
  //   const req = httpMocks.createRequest({
  //     method: "POST",
  //     url: "/voiceAlbum/familyId",
  //     params: {
  //       familyId: "1234",
  //     },
  //   });
  //   await User.findOne.mockReturnValue({
  //     userLocals,
  //   });

  //   await voiceAlbumController.createVoiceAlbum(req, res, next);
  //   expect(voiceAlbum.create).toBeCalledTimes(1);
  //   expect(res._isJSON()).toBeTruthy();
  // });

  // it("voiceAlbum response", async () => {
  //   await voiceAlbumController.createVoiceAlbum(req, res, next);
  //   expect(res.statusCode).toBe(400);
  //   expect(res._isJSON()).toBeFalsy();
  // });

  // it("voiceAlbum create res, Json body", async () => {
  //   await voiceAlbum.create.mockReturnValue(voiceAlbumBody);
  //   await voiceAlbumController.createVoiceAlbum(req, res, next);
  //   expect(res._getJSONData()).toStrictEqual(voiceAlbumBody);
  // });

  // it("voiceAlbum create error handle", async () => {
  //   const errorMessage = { message: "error Message test" };
  //   const rejectedPromise = Promise.reject(errorMessage);
  //   voiceAlbum.create.mockReturnValue(rejectedPromise);
  //   await voiceAlbumController.createVoiceAlbum(req, res, next);
  //   expect(next).toBeCalledWith(errorMessage);
  // });
});

describe("voiceAlbum GET", () => {
  it("should have a getVoiceAlbum function", () => {
    expect(typeof voiceAlbumController.getVoiceAlbum).toBe("function");
  });

  it("should call voiceAlbum.find", async () => {
    await voiceAlbumController.getVoiceAlbum(req, res, next);
    expect(voiceAlbum.find).toHaveBeenCalledWith({});
  });

  it("should return 200 response", async () => {
    await voiceAlbumController.getVoiceAlbum(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isJSON()).toBeTruthy();
  });

  it("should tretrun hson body in response", async () => {
    voiceAlbum.find.mockReturnValue(voiceAlbumList);
    await voiceAlbumController.getVoiceAlbum(req, res, next);
    expect(res._getJSONData()).toStrictEqual(voiceAlbumList);
    //JSONdata파일 형식에 {} 에러
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error finding voiceAlbum data" };
    const rejectedPromise = Promise.reject(errorMessage);
    voiceAlbum.find.mockReturnValue(rejectedPromise);
    await voiceAlbumController.getVoiceAlbum(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
