import express from "express";
import { usersRoutes } from "./routes/users";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(usersRoutes);

app.listen(PORT, function () {
  console.clear();
  console.log(`HTTP Server running on port ${PORT}`);
});