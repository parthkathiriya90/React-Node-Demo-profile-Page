import express from "express";
import authController from "../controllers/authController.mjs";
import authMiddleware from "../middleware/authMiddleware.mjs";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: Email address is already registered
 *       '500':
 *         description: Internal server error
 */

router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     description: Logs in a user with email and password and returns an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *       '401':
 *         description: Invalid credentials
 *       '404':
 *         description: User not found
 *       '409':
 *         description: User not verified
 *       '500':
 *         description: Internal server error
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User's email address
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get("/logout", authMiddleware, authController.logout);

/**
 * @swagger
 * /auth/verify-email/{code}:
 *   get:
 *     summary: Verify user's email address
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification code sent to the user's email
 *     responses:
 *       '200':
 *         description: Email address successfully verified
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get("/verify-email/:code", authController.verifyEmail);

export default router;
