import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.mjs";
import userRoutes from "./routes/user.routes.mjs";
import profileRoutes from "./routes/profile.routes.mjs";
import colors from "colors";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import specs from "./utils/swaggerConfig.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB".underline.green))
  .catch((err) => console.error("Error connecting to MongoDB:".red, err));

app.use(cors());
app.use(express.json());

app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.blue);
});
