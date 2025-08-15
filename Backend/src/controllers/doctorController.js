import mongoose from "mongoose";
import Doctor from "../models/doctorModel.js";

// This api is being used for doctor application submission as well as profile update.
export const applyForDoctor = async (req, res) => {
  try {
    const { _id = "" } = req.body;
    req.body.userId = req.userId;
    let saveData;
    let customStatus = 201;
    let customMessage = "Doctor application submitted successfully";
    if (_id) {
      if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send({
          success: false,
          message: "Invalid mongo id",
        });
      delete req.body._id;
      saveData = await Doctor.findOneAndUpdate(
        { _id: _id, isDeleted: false },
        req.body,
        { new: true }
      );
      customStatus = saveData ? 200 : 404;
      customMessage = saveData
        ? `Profile updated successfully`
        : "Profile not found to update";
    } else {
      delete req.body._id;
      saveData = await Doctor.create(req.body);
    }
    return res.status(customStatus).send({
      success: customStatus == 404 ? false : true,
      message: customMessage,
      data: customStatus == 404 ? undefined : saveData,
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
