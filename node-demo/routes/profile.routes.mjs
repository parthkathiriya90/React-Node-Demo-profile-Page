import express from "express";
import profileController from "../controllers/profile.controller.mjs";
import authMiddleware from "../middleware/authMiddleware.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile management endpoints
 */

/**
 * @swagger
 * /profile/categories:
 *   post:
 *     summary: Add a new category
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 description: The name of the category to add
 *     responses:
 *       '201':
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the category was added successfully
 *       '400':
 *         description: Bad request - Category already exists
 *       '500':
 *         description: Internal server error
 */
router.post("/categories", authMiddleware, profileController.addCategory);

/**
 * @swagger
 * /profile/skills:
 *   post:
 *     summary: Add a new skill
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: The id of the category to which the skill belongs
 *               name:
 *                 type: string
 *                 description: The name of the skill to add
 *               value:
 *                 type: number
 *                 description: The value of the skill to add
 *     responses:
 *       '201':
 *         description: Skill added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the skill was added successfully
 *                 skill:
 *                   type: object
 *                   description: The details of the newly added skill
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the skill
 *                     value:
 *                       type: number
 *                       description: The value of the skill
 *       '400':
 *         description: Bad request - Skill already exists within the category
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */
router.post("/skills", authMiddleware, profileController.addSkill);

/**
 * @swagger
 * /profile/profileImage:
 *   post:
 *     summary: Upload user profile image
 *     tags: [Profile]
 *     description: Uploads a profile image for the user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Profile image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request - Invalid image format or missing image
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.patch(
  "/profileImage",
  authMiddleware,
  profileController.uploadProfileImage
);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/", authMiddleware, profileController.profileData);

/**
 * @swagger
 * /profile/skills:
 *   get:
 *     summary: Retrieve skills for the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Skills retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the skills were retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/UserSkill'
 *       '500':
 *         description: Internal server error
 */
router.get("/skills", authMiddleware, profileController.getSkillByUserId);

export default router;
