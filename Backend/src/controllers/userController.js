import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    let { password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    let salt = await bcrypt.genSalt(10);

    req.body.password = bcrypt.hashSync(password, salt);

    req.body.isAdmin = true;

    const isUserExist = await User.find();

    if (isUserExist.length) {
      req.body.isAdmin = false;
    }

    const savedUser = await User.create(req.body);

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: savedUser,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message:
        typeof err === "string" ? err : err.message || "Internal Server Error",
      error: err && err.message ? err.message : undefined,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email: email, isDeleted: false });

    if (!isUserExist)
      return res.status(404).send({
        success: false,
        message: "User not found",
      });

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          userId: isUserExist._id,
          isAdmin: isUserExist.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).send({
        success: true,
        message: "Login successful",
        token: token,
        userId: isUserExist._id,
        isAdmin: isUserExist.isAdmin,
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message:
        typeof err === "string" ? err : err.message || "Internal Server Error",
      error: err && err.message ? err.message : undefined,
    });
  }
};
