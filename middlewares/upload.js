const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const config = require("../config");

const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKey,
  secretAccessKey: config.s3.secretKey,
  region: config.s3.bucketRegion,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "family-8",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      if (file.fieldname === "voiceFile")
        cb(null, `voice/${Date.now()}${path.basename(file.originalname)}`);
      if (file.fieldname === "photoFile")
        cb(null, `photo/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
});

module.exports = upload;
