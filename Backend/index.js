import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;


// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parses JSON bodies
app.use(cookieParser());
app.use(urlencoded({ extended: true }));


app.use("/api/v1/user",userRouter);

// Connect to DB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit process with failure
  });