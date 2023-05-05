const brandModel = require("../models/brandModel");
const handler = require("./handlerFactory");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { createImgMiddleware } = require("../middlewares/imgMiddleware");


// @desc Control image category size and quality
// @access Private
exports.sharpImageBrand = asyncHandler(async (req, res, next) => {
  const filename = "brand-" + uuidv4() + "-" + Date.now() + ".png";
  console.log(req.file);
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(320, 320)
      .toFormat("png")
      .png({ quality: 90 })
      .toFile(`uploads/brand/${filename}`);
    req.body.image = filename;
  }
  next();
});

// @desc Create image category
// @route Post /api/v1/categories
// @access Private
exports.postImageBrand = createImgMiddleware("image");

// @desc Create brand
// @route Post /api/v1/brand
// @access Private

exports.postBrand = handler.createHandler(brandModel);

// @desc Get Specific brand
// @route Get /api/v1/brand/:id
// @access Public
exports.specificBrand = handler.getSpecificOne(brandModel);

// @desc Get all brand
// @route Get /api/v1/brand
// @access Public
exports.getBrand = handler.getAll(brandModel, "Brand");

// @desc Update specific brand
// @route Put /api/v1/brand/:id
// @access Private
exports.updateBrand = handler.updateHandler(brandModel);

// @desc Delete specific brand
// @route delete /api/v1/brand/:id
// @access Private
exports.deleteBrand = handler.deleteHandler(brandModel);
