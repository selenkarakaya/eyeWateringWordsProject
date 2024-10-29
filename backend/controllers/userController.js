const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//@decs Register a new user
//@route /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  // Validation
  if (!name || !username || !email || !password) {
    res.status(404);
    throw new Error("Please, fill all fields");
  }
  // Find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hassed password
  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    username,
    email,
    password: hassedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//@decs Login an user
//@route /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Check user and password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@route /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        token: generateToken(user._id),
        name: req.body.name || user.name,
        username: req.body.username || user.username,
      },
    },
    { new: true }
  );

  res.status(200).json(updatedUser);
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
});
module.exports = { registerUser, loginUser, updateUser, getUser };
