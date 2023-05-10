import { Router } from "express";
import { register } from "../controllers/users/register";
import { authenticate } from "../controllers/users/authenticate";
import { getData } from "../controllers/users/getData";
import { verifyJwt } from "../middlewares/verifyJwt";
import { update } from "../controllers/users/update";
import { deleteUser } from "../controllers/users/delete";

export const usersRoutes = Router();

usersRoutes.post("/register", register);
usersRoutes.post("/login", authenticate);

usersRoutes.get("/:username", verifyJwt, getData);
usersRoutes.put("/:username/update", verifyJwt, update)
usersRoutes.delete("/:username/delete", verifyJwt, deleteUser)
