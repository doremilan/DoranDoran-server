require("dotenv").config();

module.exports = {
  rateLimit: {
    windowMs: process.env.WINDOW_MS,
    maxRequest: process.env.MAX_REQUEST,
  },
  jwt: {
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES,
  },
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  },
  host: {
    port: process.env.HOST_PORT,
  },
  db: {
    DB_URL: process.env.DB_NAME,
  },
  s3: {
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_ACCESS_KEY,
    bucketRegion: process.env.S3_BUCKET_REGION,
    s3Host: process.env.S3_HOST,
  },
  kakao: {
    kakaoId: process.env.KAKAO_ID,
    kakaoUrl: process.env.KAKAO_URL,
  },
  cors: {
    cors: process.env.CORS,
  },
};
