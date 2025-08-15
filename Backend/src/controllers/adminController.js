import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
      isDeleted: false,
    }).select({
      name: 1,
      email: 1,
      isAdmin: 1,
      isDoctor: 1,
    });

    return res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      data: users,
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

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({
      isDeleted: false,
    });

    return res.status(200).send({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
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

export const actionOnDoctorApplication = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    const isDoctorExist = await Doctor.findOneAndUpdate(
      {
        _id: doctorId,
        isDeleted: false,
      },
      {
        $set: { status: status },
      },
      { new: true }
    );

    if (!isDoctorExist) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    } else if (status == 1) {
      await User.findByIdAndUpdate(
        isDoctorExist.userId,
        { $set: { isDoctor: true } },
        { new: true }
      );
    }
    return res.status(200).send({
      success: true,
      message: `Doctor application ${status == 1 ? "approved" : "rejected"}`,
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
