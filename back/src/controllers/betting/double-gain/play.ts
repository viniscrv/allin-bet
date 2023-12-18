import { Request, Response } from "express";
import { z } from "zod";
import { updateUserBalance } from "../../../utils/update-user-balance";
import { prisma } from "../../../lib/prisma";

export async function play(req: Request, res: Response): Promise<Response> {
    const playBodySchema = z.object({
        color: z.enum(["red", "white", "black"]),
        amount: z.number()
    });

    const { color, amount } = playBodySchema.parse(req.body);
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

    function getColor() {
        let randomNumber = Math.floor(Math.random() * 15) + 1;

        if (randomNumber === 15) {
            randomNumber = 0;
        }

        let randomColor: String = "";

        if (randomNumber === 0) {
            randomColor = "white";
        } else if (randomNumber <= 7) {
            randomColor = "red";
        } else {
            randomColor = "black";
        }

        return { randomNumber, randomColor };
    }

    function runGame() {
        const { randomNumber, randomColor } = getColor();
        let isVictory;
        let handleAmount;

        if (color === randomColor) {
            isVictory = true;

            if (randomColor === "white") {
                handleAmount = amount * 14;

                return {
                    isVictory,
                    handleAmount,
                    randomNumber,
                    isJackpot: true
                };
            }

            handleAmount = amount;
        } else {
            isVictory = false;
            handleAmount = amount * -1;
        }

        return { isVictory, handleAmount, randomNumber, isJackpot: false };
    }

    const { isVictory, isJackpot, handleAmount, randomNumber } = runGame();

    const updatedBalance = await updateUserBalance(id, handleAmount);

    await prisma.bet.create({
        data: {
            user_id: id,
            value: amount,
            isVictory,
            isJackpot
        }
    });

    if (!isVictory) {
        return res.status(200).json({
            message: "Unfortunately you didn't win this time",
            number: randomNumber,
            losses: handleAmount,
            updatedBalance
        });
    }

    return res.status(200).json({
        message: "Congratulations, you have won",
        number: randomNumber,
        gains: handleAmount,
        updatedBalance
    });
}
