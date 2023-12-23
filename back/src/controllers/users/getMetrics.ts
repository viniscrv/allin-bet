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
                    game_name: true,
                    is_victory: true,
                    is_jackpot: true,
                    value: true
                }
            }
        }
    });

    let totalProfit = 0;
    let totalLosses = 0;

    userBets?.Bet.forEach((bet) => {
        if (bet.is_victory) {
            let value = bet.value.toNumber();
            if (bet.is_jackpot) {
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
