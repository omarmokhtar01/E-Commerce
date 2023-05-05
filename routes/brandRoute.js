const express = require("express");
const {
  ruleCreateBrandValidator,
  ruleGetBrandValidator,
  ruleUpdateBrandValidator,
  ruleDeleteBrandValidator,
} = require("../utils/validator/brand");

const { authProtect, allowedTo } = require("../Controller/authService");

const {
  postBrand,
  getBrand,
  specificBrand,
  updateBrand,
  deleteBrand,
  sharpImageBrand,
  postImageBrand,
  imageCloudinaryBrand,
} = require("../Controller/brandServices");

const router = express.Router();

router
  .route("/")
  .get(getBrand)

  .post(
    authProtect,
    allowedTo("admin", "manager"),
    postImageBrand,
    // sharpImageBrand,
    imageCloudinaryBrand,

    ruleCreateBrandValidator,
    postBrand
  );

router
  .route("/:id")
  .get(ruleGetBrandValidator, specificBrand)

  .put(
    authProtect,
    allowedTo("admin", "manager"),
    postImageBrand,
    sharpImageBrand,
    ruleUpdateBrandValidator,
    updateBrand
  )

  .delete(
    authProtect,
    allowedTo("admin", "manager"),
    ruleDeleteBrandValidator,
    deleteBrand
  );

module.exports = router;
