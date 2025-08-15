import Doctor from "../models/doctorModel.js";

export const applyForDoctor = async (req, res) => {
  try {
    req.body.userId = req.userId;
    const saveData = await Doctor.create(req.body);
    return res.status(201).send({
      success: true,
      message: "Doctor application submitted successfully",
      data: saveData,
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
