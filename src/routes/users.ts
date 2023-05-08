import { Router } from "express";
import { register } from "../controllers/users/register";
import { authenticate } from "../controllers/users/authenticate";

export const usersRoutes = Router();

usersRoutes.post("/register", register);
usersRoutes.post("/login", authenticate);
