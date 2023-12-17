import { Request, Response } from "express";
import { z } from "zod";
import { updateUserBalance } from "../../../utils/update-user-balance";
import { prisma } from "../../../lib/prisma";

export async function generateDeck(req: Request, res: Response): Promise<Response> {
    const playBodySchema = z.object({
        value: z.number(),
        minesQuantity: z.number(), // TODO: validar
    });

    const { value, minesQuantity } = playBodySchema.parse(req.body);
    const id = req.userId;

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            balance: true
        }
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const userBalance = Number(user.balance);

    if (value <= 0) {
        return res.status(403).json({ message: "Invalid value" });
    }

    if (value > userBalance) {
        return res.status(400).json({ message: "Insufficient balance" });
    }

    let deck = [];

    for (let i = 0; i < 25; i++) {
        deck.push({
            id: i,
            value: "diamond",
            turned: "false"
        });
    }

    let drawnedNumbers: Number[] = [];

    for (let i = 0; i < minesQuantity; i++) {
        let drawned = Math.floor(Math.random() * 25);

        
        if (!drawnedNumbers.includes(drawned)) {
            deck[drawned].value = "bomb";
            
            drawnedNumbers.push(drawned);
        } else {
            i = i - 1;
        }
    }

    return res.status(200).json({
        deck,
    });
}

