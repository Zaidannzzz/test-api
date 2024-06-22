const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Validate email format
  if (!emailVerification(email)) {
    return res.status(400).json({
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null,
    });
  }

  // Validate password length
  if (!passwordVerification(password)) {
    return res.status(400).json({
      status: 102,
      message: "Parameter password harus lebih dari 8 karakter",
      data: null,
    });
  }

  // Encrypting Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save to DB
  const newUser = await userModel.createUser({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });

  res.status(200).json({
    status: 0,
    message: "Registrasi berhasil silahkan login",
    data: newUser,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!emailVerification(email)) {
    return res.status(400).json({
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null,
    });
  }

  // Validate password length
  if (!passwordVerification(password)) {
    return res.status(400).json({
      status: 102,
      message: "Parameter password harus lebih dari 8 karakter",
      data: null,
    });
  }

  // Get User Data by Email
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({
      status: 103,
      message: `Email atau Password salah`,
      data: null,
    });
  }

  // Check Password if Password Matched
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(103).json({
      status: 0,
      message: "Password Salah",
      data: null,
    });
  }

  // Generate JWT
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });

  res.status(200).json({
    status: 0,
    message: "Login Sukses",
    data: { token: token },
  });
};

const emailVerification = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const passwordVerification = (password) => {
  return password.length >= 8;
};

module.exports = {
  register,
  login,
};
