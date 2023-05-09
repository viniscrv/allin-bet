import { Router } from "express";
import { register } from "../controllers/users/register";
import { authenticate } from "../controllers/users/authenticate";
import { getData } from "../controllers/users/getData";
import { verifyJwt } from "../middlewares/verifyJwt";

export const usersRoutes = Router();

usersRoutes.post("/register", register);
usersRoutes.post("/login", authenticate);
usersRoutes.get("/:username", verifyJwt, getData)
