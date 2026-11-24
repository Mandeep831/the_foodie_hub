import recipeRoutes from "./routes/recipeRoutes.js";
import { prisma } from "./prisma.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://the-foodie-12oef2cac-mandeep19.vercel.app",
      "https://the-foodie-4gsl0oedb-mandeep19.vercel.app",
    ],
  })
);

app.use(express.json());

app.use("/api/recipes", recipeRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "FoodieHub Backend is running!" });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "success",
    message: "FoodieHub API is working!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  prisma.$connect()
    .then(() => console.log("Database connected successfully!"))
    .catch((error: unknown) =>
      console.error("Database connection failed:", error)
    );
});