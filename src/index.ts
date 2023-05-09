import express from "express";
import { usersRoutes } from "./routes/users";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const prisma = new PrismaClient();

app.use(express.json());
app.use(usersRoutes);

app.listen(PORT, function () {
  console.clear();
  console.log(`HTTP Server running on port ${PORT}`);
});

(async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (e) {
    console.error("Database connection error", e);
  }
})();

