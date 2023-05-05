const express = require("express");
const {
  ruleCreateUserValidator,
  rulePasswordAdminValidator,
  rulePasswordUserValidator,
  ruleUpdateUserLoggerValidator,
} = require("../utils/validator/users");

const {
  createUser,
  getUser,
  specificUser,
  updateUser,
  unActivtedUser,
  sharpImageUser,
  postImageUser,
  updatePasswordAdmin,
  // User Routes
  getProfile,
  updatePasswordUser,
  updateUserData,
  logOutUser,
} = require("../Controller/userServices");

const { authProtect, allowedTo } = require("../Controller/authService");

const router = express.Router();

// User
router.use(authProtect);
router
  .route("/myProfile")
  .get(getProfile, specificUser)
  .put(rulePasswordUserValidator, updatePasswordUser)
  .delete(logOutUser);
router
  .route("/data")
  .put(
    ruleUpdateUserLoggerValidator,
    postImageUser,
    sharpImageUser,
    updateUserData
  );

// Admin
router.use(authProtect, allowedTo("admin", "manager"));

router
  .route("/changepassword/:id")
  .put(authProtect, rulePasswordAdminValidator, updatePasswordAdmin);

router
  .route("/")
  .get(getUser)
  .post(ruleCreateUserValidator, postImageUser, sharpImageUser, createUser);

router
  .route("/:id")
  .get(specificUser)
  .put(postImageUser, sharpImageUser, updateUser)
  .delete(unActivtedUser);

module.exports = router;
