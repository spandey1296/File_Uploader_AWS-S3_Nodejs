const upload = require("./upload-manager");
const logger = require("./logger").logger;

const addToS3Bucket = async (imageObject) => {
  try {
    const urlArray = [];

    for (let [key, value] of Object.entries(imageObject)) {
      let imageName = new Date().getTime() + value.name;
      urlArray.push(upload.uploadFilesOnS3WithFileName(value, imageName, key));
    }
    const urls = await Promise.all(urlArray);
   
    let splashImage = {};
    urls.map((url) => {
      splashImage[url.clientName] = url.original;
    });
    return splashImage;
  } catch (error) {
    throw error;
  }
};

module.exports = addToS3Bucket;