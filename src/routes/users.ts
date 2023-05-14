import { Router } from "express";
import { register } from "../controllers/users/register";
import { authenticate } from "../controllers/users/authenticate";
import { getData } from "../controllers/users/getData";
import { verifyJwt } from "../middlewares/verifyJwt";
import { update } from "../controllers/users/update";
import { deleteUser } from "../controllers/users/delete";
import { deposit } from "../controllers/users/deposit";
import { getHistory } from "../controllers/users/getHistory";

export const usersRoutes = Router();

usersRoutes.post("/register", register);
usersRoutes.post("/login", authenticate);

// Authenticated
usersRoutes.get("/me", verifyJwt, getData);
usersRoutes.get("/history", verifyJwt, getHistory);
usersRoutes.put("/edit", verifyJwt, update);
usersRoutes.delete("/delete", verifyJwt, deleteUser);
usersRoutes.patch("/deposit", verifyJwt, deposit);
