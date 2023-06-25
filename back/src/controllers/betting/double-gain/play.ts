import { Request, Response } from "express";
import { z } from "zod";
import { updateUserBalance } from "../../../utils/update-user-balance";
import { prisma } from "../../../lib/prisma";

export async function play(req: Request, res: Response): Promise<Response> {
    const playBodySchema = z.object({
        color: z.enum(["red", "white", "black"]),
        value: z.number()
    });

    const { color, value } = playBodySchema.parse(req.body);
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
        let handleValue;

        if (color === randomColor) {
            isVictory = true;

            if (randomColor === "white") {
                handleValue = value * 14;

                return {
                    isVictory,
                    handleValue,
                    randomNumber,
                    isJackpot: true
                };
            }

            handleValue = value;
        } else {
            isVictory = false;
            handleValue = value * -1;
        }

        return { isVictory, handleValue, randomNumber, isJackpot: false };
    }

    const { isVictory, isJackpot, handleValue, randomNumber } = runGame();

    const updatedBalance = await updateUserBalance(id, handleValue);

    await prisma.bet.create({
        data: {
            user_id: id,
            value,
            isVictory,
            isJackpot
        }
    });

    if (!isVictory) {
        return res.status(200).json({
            message: "Unfortunately you didn't win this time",
            number: randomNumber,
            losses: handleValue,
            updatedBalance
        });
    }

    return res.status(200).json({
        message: "Congratulations, you have won",
        number: randomNumber,
        gains: handleValue,
        updatedBalance
    });
}
