const AWS = require('aws-sdk');
const Constants = require('../util/constants');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const s3 = new AWS.S3({
    Bucket: Constants.AWS_S3_PUBLIC_BUCKET
});

class UploadService {
    static async uploadFile (file, filename) {
        const data = {
            Key: filename,
            Bucket: Constants.AWS_S3_PUBLIC_BUCKET,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        if (process.env.NODE_ENV !== 'testing') {
            return await s3.putObject(data).promise();
        } else {
            return Promise.resolve();
        }
    }

    static async deleteObject (filename) {
        const data = {
            Key: filename,
            Bucket: Constants.AWS_S3_PUBLIC_BUCKET
        };
        if (process.env.NODE_ENV !== 'testing') {
            return await s3.deleteObject(data).promise();
        } else {
            return Promise.resolve();
        }
    }
}

module.exports = UploadService;
