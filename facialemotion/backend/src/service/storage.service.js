const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});


// function uploadFile((file) => {
//     return new Promise((resolve, reject) => {
        
//     })
// })
// This function upload audio at ImageKit
function uploadFile(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file provided'));
            return;
        }
        
        imagekit.upload({
            file: file.buffer,
            fileName: `song_${Date.now()}_${file.originalname || 'audio'}`,
            folder: '/songs'
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
module.exports = uploadFile;
