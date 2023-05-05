const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dn05vqdfg",
  api_key: "577477985636914",
  api_secret: "Q7nONA5KAFhsl_A8kTNwsOPc5U4",
});

// // uploadImgCloudinary
// const uploadImgCloudinary = async (fileUpload) => {
//   try {
//     const data = await cloudinary.uploader.upload(fileUpload, {
//       resource_type: "auto",
//     });
//     return data;
//   } catch (e) {
//     return e;
//   }
// };

module.exports = cloudinary;
