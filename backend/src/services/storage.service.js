const ImageKit = require("@imagekit/nodejs");
const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;
if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
  throw new Error("ImageKit environment variables are not set");
}
const imagekitClient = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName = "music_" + Date.now() + ".mp3") {
  try {
    console.log("Uploading to ImageKit...");

    // 🔧 Convert buffer → base64
    const base64File = fileBuffer.toString("base64");

    const result = await imagekitClient.files.upload({
      file: base64File,
      fileName,
      folder: "spotify/music",
    });

    console.log("Upload success:", result.url);

    return result;

  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
}

module.exports = uploadFile;
