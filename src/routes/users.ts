import { Router } from "express";
import { register } from "../controllers/users/register";

export const usersRoutes = Router();

usersRoutes.post("/register", register);