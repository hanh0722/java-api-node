const cloudinary = require("cloudinary").v2;
const { throwError } = require("../util");
const removeFile = require("../util/removeFile");
const uploadSingleImage = async (path) => {
  try {
    const generateCDN = await cloudinary.uploader.upload(path);
    if (!generateCDN) {
      throwError("cdn is not generated successfully", 500);
    }
    removeFile(path);
    return generateCDN;
  } catch (err) {
      console.log(err);
    throwError("cannot generate cdn", 500);
  }
};

module.exports = uploadSingleImage;
