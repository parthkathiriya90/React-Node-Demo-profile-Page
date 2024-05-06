import express from "express";
import userController from "../controllers/user.controller.mjs";
import authMiddleware from "../middleware/authMiddleware.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get list of users
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: User list retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/", userController.userList);

/**
 * @swagger
 * /user/deleted:
 *   get:
 *     summary: Get list of deleted users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Deleted user list retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get("/deleted", authMiddleware, userController.deletedUser);

/**
 * @swagger
 * /user/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User's email address
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:email", authMiddleware, userController.userByEmail);

/**
 * @swagger
 * /user:
 *   patch:
 *     summary: Update user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               updates:
 *                 type: object
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.patch("/", authMiddleware, userController.updateUser);

/**
 * @swagger
 * /user/restore/{id}:
 *   patch:
 *     summary: Restore deleted user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to restore
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User restored successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.patch(
  "/restore/:id",
  authMiddleware,
  userController.restoreDeletedUserById
);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updates:
 *                 type: object
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.patch("/updateProfile/:id", authMiddleware, userController.updateUserById);

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/", authMiddleware, userController.deleteUser);

/**
 * @swagger
 * /auth/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, userController.deleteUserByIds);

export default router;
