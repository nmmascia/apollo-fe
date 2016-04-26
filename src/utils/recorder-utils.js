import browser from 'bowser';
import debug from 'debug';
import getUserMedia from 'getusermedia';

const log = debug('ap.recorder-utils'); // eslint-disable-line no-unused-vars

const constraints = { audio: true, video: false };
const chunks = [];
let mediaStream = null;
let mediaRecorder = null;
const mimeType = { type: 'audio/wav' };

export const createRecorder = () => {
    return new Promise((resolve, reject) => {
        getUserMedia(constraints, (err, stream) => {
            if (err) {
                reject(err);
            } else {
                mediaStream = stream;
                mediaRecorder = new MediaRecorder(stream); // eslint-disable-line no-undef
                mediaRecorder.ondataavailable = e => chunks.push(e.data);
                resolve(stream);
            }
        });
    });
};

export const start = () => {
    log('Recording...');
    mediaRecorder.start();
};

export const stop = () => {
    log('Recording stopped.');
    mediaRecorder.stop();
};

const getAudioBlob = () => {
    const blob = new Blob(chunks, mimeType);
    log('Audio blob:', blob);
    return blob;
};

export const getAudioUrl = () => {
    const url = URL.createObjectURL(getAudioBlob());
    return url;
};
