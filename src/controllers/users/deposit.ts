import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function deposit(req: Request, res: Response): Promise<Response> {
    const depositBodySchema = z.object({
        cardNumber: z.string(),
        value: z.number(),
    });

    const { cardNumber, value } = depositBodySchema.parse(req.body);

    if (cardNumber !== "4242.4242.4242.4242") {
        // O ideal seria o número válido estar dentro das váriaveis de ambiente
        return res.status(403).json({ message: "Invalid card number" });
    }

    const id = req.userId;

    const userBalance = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            balance: true,
        },
    });

    const balance = userBalance?.balance;
    const updatedBalance = Number(balance) + value;

    const updatedUserBalance = await prisma.user.update({
        where: {
            id,
        },
        data: {
            balance: new Prisma.Decimal(updatedBalance),
        },
    });

    return res
        .status(200)
        .json({ message: "Successful purchase", updatedUserBalance });
}
