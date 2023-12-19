import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { play } from "../controllers/betting/double-gain/play";
import { generateDeck } from "../controllers/betting/mines/generateDeck";
import { result } from "../controllers/betting/mines/result";

export const bettingRoutes = Router();

// double gain
bettingRoutes.post("/doublegain", verifyJwt, play);

// mines
bettingRoutes.post("/mines/generate", verifyJwt, generateDeck);
bettingRoutes.post("/mines/result", verifyJwt, result);