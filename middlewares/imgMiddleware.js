const multer = require("multer");
const ApiError = require("../utils/apiError");
const multerOption = () => {
  const multerFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image")) {
      return cb(new ApiError(400, "Please insert image"));
    }
    cb(undefined, true);
  };

  // if i want to do image processing like sharp. use this memoryStorage
  const storage = multer.memoryStorage();

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: multerFilter,
  });
  return upload;
};
// for create single image
exports.createImgMiddleware = (feildName) => multerOption().single(feildName);
// for create multi image
exports.uploadMultiImagesMiddleware = (arrImg) => multerOption().fields(arrImg);
