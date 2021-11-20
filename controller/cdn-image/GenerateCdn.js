const generateSingleCDN = require("../../util/generate-cdn-single");
const generateMultiple = require("../../util/generate-cdn-array");
const { handleNextError, throwError } = require("../../util");
const removeFile = require("../../util/removeFile");
exports.uploadSingleImage = async (req, res, next) => {
  const file = req.files;
  if (!file) {
    throwError("file is not valid", 422);
  }
  try {
    const cdn = await generateSingleCDN(file[0].path);
    res.json({
      message: "successfully",
      code: 200,
      url: cdn.secure_url,
    });
  } catch (err) {
    handleNextError(err, next);
  }
};

exports.uploadMultipleImage = async (req, res, next) => {
  const files = req.files;
  if (!files) {
    throwError("file is not valid", 422);
  }
  try {
    const fileArray = [];
    for (const file of files) {
        const { path } = file;
        const newPath = await generateMultiple(path);
        fileArray.push(newPath);
        removeFile(path)
    }
    res.json({
      message: "successfully",
      code: 200,
      urls: fileArray.map((item) => item.res),
    });
  } catch (err) {}
};
