import ImageKit from "@imagekit/nodejs";

const imagekit = new imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndPoint: process.env.IMAGEKIT_URL_ENDPOINT
})
// Upload one file buffer. Returns ImageKit's response (has url, fileId, etc.).
export const uploadImage = async (file, fileName) => {

    const response = await imagekit.upload({
        file: file,
        fileName: fileName,
        folder: "cohort-ai-social"
    })

    return response
};