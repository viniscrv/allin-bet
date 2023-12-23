import { Request, Response } from "express";
import { z } from "zod";
import { updateUserBalance } from "../../../utils/update-user-balance";
import { prisma } from "../../../lib/prisma";

export async function result(req: Request, res: Response): Promise<Response> {
    const playBodySchema = z.object({
        remainingGems: z.number(),
        minesQuantity: z.number(),
        multiplier: z.number(),
        amount: z.number()
    });

    const { remainingGems, minesQuantity, multiplier, amount } =
        playBodySchema.parse(req.body);

    const total = remainingGems + minesQuantity;
    const isJackpot = remainingGems == 0;

    // gambi
    const isVictory =
        minesQuantity == 5 || minesQuantity == 10 || minesQuantity == 15;

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

    if (amount <= 0) {
        return res.status(403).json({ message: "Invalid amount" });
    }

    if (amount > userBalance) {
        return res.status(400).json({ message: "Insufficient balance" });
    }

    await prisma.bet.create({
        data: {
            user_id: id,
            game_name: "Mines",
            value: amount,
            is_victory: isVictory,
            is_jackpot: isJackpot
        }
    });

    if (!isVictory) {
        return res.status(200).json({
            message: "Unfortunately you didn't win this time"
        });
    }

    const handleAmount = amount * multiplier;
    const updatedBalance = await updateUserBalance(id, handleAmount);

    return res.status(200).json({
        message: "Congratulations, you have won",
        gains: handleAmount,
        updatedBalance
    });
}
