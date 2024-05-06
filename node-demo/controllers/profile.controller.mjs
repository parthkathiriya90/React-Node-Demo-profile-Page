import multer from "multer";
import User from "../models/userModel.mjs";
import "../utils/cloudinary.config.mjs"; // Import Cloudinary configuration
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Skills from "../models/skills.model.mjs";

const uploadProfileImage = async (req, res) => {
  console.log("- Start user profile image uploading.".yellow);
  try {
    console.log(
      "- Create a CloudinaryStorage instance with the configured Cloudinary instance"
        .yellow
    );
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "User_Profile_Images", // Specify the folder where images will be stored
        allowedFormats: ["jpeg", "jpg", "png"], // Specify allowed file formats
      },
    });

    console.log(
      "- Create a multer instance with the configured storage".yellow
    );
    const multerUpload = multer({ storage }).single("image");

    console.log("- Perform the upload with multer middleware".yellow);
    multerUpload(req, res, async (err) => {
      if (err) {
        console.error("Upload failed:", err);
        return res.status(500).json({ error: "Upload failed" });
      }

      try {
        console.log("- Find user data and update the profile image.".yellow);
        const updatedUser = await User.updateOne(
          { _id: req.body.id, delete: false },
          { $set: { image: req.file } }
        );

        if (!updatedUser) {
          console.log("- User not found!".underline.red);
          return res.status(404).json({ message: "User not found" });
        }

        console.log("Upload successful:", req.file);
        // Send a response with the URL of the uploaded image
        res.status(200).json({ message: "Update user successfully!" });
      } catch (error) {
        console.error(
          "- Error updating user profile image in the database:".underline.red,
          error
        );
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("- Error user profile image:".underline.red, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const profileData = async (req, res) => {
  console.log("=> Start get profile process.".yellow);
  try {
    const { userId, email } = req.query;

    console.log(`- Find user profile by email: ${email}`.yellow);
    const profile = await User.find({ email, delete: false });

    console.log("- Get user profile successfully!".underline.green);
    res.status(200).json({ data: profile[0] });
  } catch (error) {
    console.error("- Error user profile:".underline.red, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addSkill = async (req, res) => {
  console.log("=> Start add skills process.".yellow);
  try {
    const { userId, email } = req.query;

    console.log("- Check if the category exists".yellow);
    const userSkill = await Skills.findOne({ userID: userId });

    if (!userSkill) {
      console.log("- User skill entry not found".underline.red);
      return res.status(404).json({ message: "User skill entry not found" });
    }

    const { categoryId, name, value } = req.body;

    // Find the category within the userSkill categories array
    const categoryIndex = userSkill.categories.findIndex(
      (cat) => cat._id == categoryId
    );

    // If the category doesn't exist, return error
    if (categoryIndex === -1) {
      console.log("- Category not found".underline.red);
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if the skill name already exists within the category
    const existingSkill = userSkill.categories[categoryIndex].list.find(
      (skill) => skill.name === name
    );

    if (existingSkill) {
      console.log("- Skill already exists within the category".underline.red);
      return res
        .status(400)
        .json({ message: "Skill already exists within the category" });
    }

    // Add the new skill to the specified category
    userSkill.categories[categoryIndex].list.push({
      name,
      value,
    });

    // Save the updated userSkill document
    await userSkill.save();

    console.log("- Skill added successfully".underline.green);
    return res.status(201).json({ message: "Skill added successfully" });
  } catch (error) {
    console.error("Error adding skill:".underline.red, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addCategory = async (req, res) => {
  console.log("=> Start add new skills categories process.".yellow);
  try {
    const { userId, email } = req.query;

    console.log("- Check if the user's skill entry exists".yellow);
    let userSkill = await Skills.findOne({ userID: userId });

    if (!userSkill) {
      console.log("- User skill entry not found, creating a new one".yellow);
      // If the user's skill entry doesn't exist, create a new one
      userSkill = await Skills.create({ userID: userId, categories: [] });
    }

    const { categoryName } = req.body;

    // Check if the category name already exists
    const existingCategory = userSkill.categories.find(
      (cat) => cat.categoryName === categoryName
    );

    if (existingCategory) {
      console.log("- Category already exists".underline.red);
      return res.status(400).json({ message: "Category already exists" });
    }

    // Add the new category
    userSkill.categories.push({ categoryName });

    // Save the updated userSkill document
    await userSkill.save();

    console.log(`- Category added successfully`.underline.green);
    return res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Error adding category:".underline.red, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSkillByUserId = async (req, res) => {
  console.log("=> Start get skills by userId process.".yellow);
  try {
    const { userId, email } = req.query;

    let userSkills = await Skills.find({ userID: userId })
      .populate("userID")
      .exec();

    console.log("- skills get successfully".underline.green);
    return res
      .status(201)
      .json({ message: "", data: userSkills[0].categories });
  } catch (error) {
    console.error("Error adding category:".underline.red, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  uploadProfileImage,
  profileData,
  addSkill,
  addCategory,
  getSkillByUserId,
};
