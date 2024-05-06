import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    status: { type: String, default: "unAuthenticated" },
    delete: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    image: {
      fieldname: { type: String },
      originalname: { type: String },
      encoding: { type: String },
      mimetype: { type: String },
      path: { type: String },
      size: { type: Number },
      filename: { type: String },
    },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
