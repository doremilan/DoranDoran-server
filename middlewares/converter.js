const fs = require("fs");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const config = require("../config");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKey,
  secretAccessKey: config.s3.secretKey,
  region: config.s3.bucketRegion,
});

const convertAndSaveS3 = (newFileName, location) => {
  const key = location.split(".com/")[1];
  let params = { Bucket: "family-8", Key: key };
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(location)
      .toFormat("mp3")
      .output(newFileName)
      .on("error", (err) => {
        console.log("An error occurred: " + err.message);
      })
      .on("progress", (progress) => {
        console.log("Processing: " + progress.targetSize + " KB converted");
      })
      .on("end", () => {
        console.log("Processing finished !");
        const fileContent = fs.readFileSync(newFileName);
        params.Key = `voice/${newFileName}`;
        params.Body = fileContent;
        s3.putObject(params, function (err, data) {
          console.log(err, data);
        });
        setTimeout(() => {
          resolve();
        }, 500);
      })
      .run();
  });
};

module.exports = convertAndSaveS3;
