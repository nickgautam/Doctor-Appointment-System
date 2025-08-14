import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const doctorSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, required: true, ref: "User", trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    website: { type: String, trim: true, default: "" },
    address: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    experience: { type: Number, required: true },
    feesPerConsultation: { type: Number, required: true },
    status: { type: Number, default: 0 }, // 0 - pending, 1 - approved, 2 - rejected
    timing: {
      from: { type: String, required: true, trim: true },
      to: { type: String, required: true, trim: true },
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
