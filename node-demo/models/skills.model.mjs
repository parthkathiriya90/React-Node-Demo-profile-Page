import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  list: [
    {
      name: { type: String },
      value: { type: Number },
    },
  ],
});

const userSkillSchema = new mongoose.Schema({
  categories: [categorySchema],
  username: { type: String },
  userID: { type: mongoose.Schema.Types.ObjectId },
});

const UserSkill = mongoose.model("UserSkill", userSkillSchema);

export default UserSkill;
