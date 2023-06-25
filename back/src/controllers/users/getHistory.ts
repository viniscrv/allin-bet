import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getHistory(
    req: Request,
    res: Response
): Promise<Response> {
    const id = req.userId;

    const userBets = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            Bet: {
                orderBy: {
                    created_at: "desc"
                },
                select: {
                    isVictory: true,
                    value: true,
                    created_at: true,
                },
            },
        },
    });

    return res.status(200).json({ userBets });
}
