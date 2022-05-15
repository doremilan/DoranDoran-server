require("dotenv").config()

// function required(key = undefined) {
//   const value = process.env[key]
//   if (value == null) {
//     throw new Error(`Key ${key} is undefined`)
//   }
// }

module.exports = {
  jwt: {
    secretKey: required("SECRET_KEY"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC")),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS")),
  },
  host: {
    port: parseInt(required("HOST_PORT")),
  },
  db: {
    DB_URL: required("DB_NAME"),
  },
  s3: {
    accessKey: required("S3_ACCESS_KEY"),
    secretKey: required("S3_SECRET_ACCESS_KEY"),
    bucketRegion: required("S3_BUCKET_REGION"),
  },
  kakao: {
    kakaoId: required("KAKAO_ID"),
    kakaoUrl: required("KAKAO_URL"),
  },
}
