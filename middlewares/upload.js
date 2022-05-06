const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'family-8',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      if (file.fieldname === "voiceFile")
        cb(null, `voice/${Date.now()}${path.basename(file.originalname)}`);
      if (file.fieldname === "photo")
        cb(null, `photo/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
});


module.exports = upload;