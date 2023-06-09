import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getMetrics(
    req: Request,
    res: Response
): Promise<Response> {
    const { userId } = req;

    const userBets = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            Bet: {
                select: {
                    isVictory: true,
                    isJackpot: true,
                    value: true
                }
            }
        }
    });

    let totalProfit = 0;
    let totalLosses = 0;

    userBets?.Bet.forEach((bet) => {
        if (bet.isVictory) {
            let value = bet.value.toNumber();
            if (bet.isJackpot) {
                totalProfit += value * 14;
            } else {
                totalProfit += value;
            }
        } else {
            totalLosses += bet.value.toNumber();
        }
    });

    return res.status(200).json({ totalProfit, totalLosses });
}
