const ImageKit = require("@imagekit/nodejs");

const imagekitClient = new ImageKit({
  publicKey: 'public_SCPBv9de3vTZSYUb+eC7oKN36XY=',
  privateKey: 'private_JhbmjFe1RTlhrKG31ODKeThg3YY=',
  urlEndpoint: 'https://ik.imagekit.io/oil1flwaw',
});

async function uploadFile(fileBuffer) {
  try {
    console.log("Uploading to ImageKit...");

    // 🔧 Convert buffer → base64
    const base64File = fileBuffer.toString("base64");

    const result = await imagekitClient.files.upload({
      file: base64File,
      fileName: "music_" + Date.now(),
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
