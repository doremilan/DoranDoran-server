const fs = require('fs');
const path = require('path');
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const aws = require('aws-sdk');
require("dotenv").config();

const s3 = new aws.S3({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    region: S3_BUCKET_REGION,
});

// name 수정 필요 
const convertAndSaveS3 = (ranFileName, location) => {
    const key = location.split(".com/")[1];
    let params = { Bucket: S3_BUCKET_NAME, Key: key };
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(location)
            .toFormat("mp3")
            .output(ranFileName)
            .on("error", (err) => {
                console.log("An error occurred: " + err.message);
            })
            .on("progress", (progress) => {
                console.log("Processing: " + progress.targetSize + " KB converted");
            })
            .on("end", () => {
                console.log("Processing finished !");
                const fileContent = fs.readFileSync(ranFileName);
                params.Key = `tracks/${ranFileName}`;
                params.Body = fileContent;
                s3.putObject(params, function (err, data) {
                    console.log(err, data);
                });
                deleteMp3(ranFileName);
                setTimeout(() => {
                    resolve();
                }, 500);
            })
            .run();
    });
};

//파일 삭제부분같은데 코드이해를 좀 더 해야될 것 같음
const deleteMp3 = (ranFileName) => {
    const filePath = path.join(`/home/ubuntu/voice/${ranFileName}`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) return console.log(MESSAGE.NOT_DELETE);
        fs.unlink(filePath, (err) =>
            err ? console.log(err) : console.log(`${filePath} 를 정상적으로 삭제했습니다`),
        );
    });
};

module.exports = { convertAndSaveS3 };