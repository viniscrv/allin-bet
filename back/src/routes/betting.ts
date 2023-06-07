import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { play } from "../controllers/betting/double-gain/play";

export const bettingRoutes = Router();

bettingRoutes.post("/doublegain", verifyJwt, play);
