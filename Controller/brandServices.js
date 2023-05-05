const brandModel = require("../models/brandModel");
const handler = require("./handlerFactory");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { createImgMiddleware } = require("../middlewares/imgMiddleware");
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: "dn05vqdfg",
  api_key: "577477985636914",
  api_secret: "Q7nONA5KAFhsl_A8kTNwsOPc5U4",
});
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

// @desc add image to cloudinary
// @access Private
exports.imageCloudinaryBrand = asyncHandler(async (req, res, next) => {
  console.log(cloudinary.uploader.upload());
  // cloudinary.v2.uploader.upload(
  //   "/home/my_image.jpg",
  //   { upload_preset: "my_preset" },
  //   (error, result) => {
  //     console.log(result, error);
  //   }
  // );
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
