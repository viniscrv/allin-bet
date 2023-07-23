import express from "express";
import { usersRoutes } from "./routes/users";
import dotenv from "dotenv";
import { bettingRoutes } from "./routes/betting";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 10000;

app.use(cors());
app.use(express.json());
app.use(usersRoutes);
app.use(bettingRoutes);

app.listen(PORT, function () {
    console.clear();
    console.log(`HTTP Server running on port ${PORT}`);
});
