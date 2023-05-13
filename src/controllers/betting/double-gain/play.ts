import { Request, Response } from "express";
import { z } from "zod";
import { updateUserBalance } from "../../../utils/update-user-balance";
import { prisma } from "../../../lib/prisma";

export async function play(req: Request, res: Response): Promise<Response> {
    const playBodySchema = z.object({
        color: z.enum(["yellow", "black"]).refine((colors) => {
            return colors.toLowerCase();
        }),
        value: z.number(),
    });

    const { color, value } = playBodySchema.parse(req.body);
    const id = req.userId;

    // verificação do saldo do usuário
    const user = await prisma.user.findUnique({
        where: { id },
        select: { balance: true },
    });
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    const userBalance = Number(user.balance);
    
    if (value > userBalance) {
        return res.status(400).json({ message: "Insufficient balance" });
    }

    function getColor() {
        const randomNumber = Math.floor(Math.random() * 10) + 1;

        let randomColor: String = "";

        if (randomNumber >= 1 && randomNumber <= 5) {
            randomColor = "yellow";
        } else {
            randomColor = "black";
        }
        return randomColor;
    }

    function runGame() {
        const randomColor = getColor();
        let isVictory;
        let handleValue;

        if (color === randomColor) {
            isVictory = true;
            handleValue = value * 2;
        } else {
            isVictory = false;
            handleValue = value * -1;
        }

        return { isVictory, handleValue };
    }


    const { isVictory, handleValue } = runGame();

    const updatedBalance = await updateUserBalance(id, handleValue);

    await prisma.bet.create({
        data: {
            user_id: id,
            value,
            isVictory,
        },
    });

    if (!isVictory) {
        return res.status(200).json({
            message: "Unfortunately you didn't win this time",
            updatedBalance,
        });
    }

    return res
        .status(200)
        .json({ message: "Congratulations, you have won", updatedBalance });
}
