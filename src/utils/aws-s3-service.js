import 'aws-sdk/dist/aws-sdk';
import debug from 'debug';

import {
    accessKeyId,
    secretAccessKey,
} from 'aws-keys';

const log = debug('ap.aws-s3-storage'); // eslint-disable-line no-unused-vars

const Bucket = 'apollo-development';

const s3 = new window.AWS.S3({
    accessKeyId,
    secretAccessKey,
});

export const getAudioUrl = key => {
    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', { Bucket, Key: key }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};
