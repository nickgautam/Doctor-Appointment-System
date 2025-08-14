import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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
