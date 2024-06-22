const userModel = require("../models/usermodel");

const getProfile = async (req, res) => {
  const user = await userModel.getUserByEmail(req.user.email);
  res.status(200).json({
    status: 0,
    message: "Sukses",
    data: user,
  });
};

const updateProfile = async (req, res) => {
  const { first_name, last_name } = req.body;
  const updatedUser = await userModel.updateUserProfile(
    req.user.email,
    first_name,
    last_name
  );
  res.status(200).json({
    status: 0,
    message: "Update Pofile berhasil",
    data: updatedUser,
  });
};

const updateImage = async (req, res) => {
  console.log("req.file", req.file);
  console.log("req.file.path", req.file.path);
  console.log("req.user.email", req.user.email);
  if (!req.file) {
    return res.status(400).json({
      status: 102,
      message: "Tidak ada File yang diupload",
      data: null,
    });
  }

  const fileImagePath = req.file.path;

  const updatedUser = await userModel.updateUserImage(req.user.email, fileImagePath);
  res.status(200).json({
    status: 0,
    message: "Update Profile Image berhasil",
    data: updatedUser,
  });
};


module.exports = {
  getProfile,
  updateProfile,
  updateImage,
};
