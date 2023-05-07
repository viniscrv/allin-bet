import express from "express";
import { usersRoutes } from "./routes/users";

const app = express();

app.use(express.json());

app.use(usersRoutes);

app.listen(3333, function () {
    console.clear();
    console.log("HTTP Server running");
});
