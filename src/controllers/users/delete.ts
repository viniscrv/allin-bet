import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function deleteUser(req: Request, res: Response) {
    const { userId } = req;

    const betCount = await prisma.bet.count({
        where: {
            user_id: userId,
        },
    });

    if (betCount > 0) {
        await prisma.bet.deleteMany({
            where: {
                user_id: userId,
            },
        });
    }

    await prisma.user.delete({
        where: {
            id: userId,
        },
    });

    return res.status(204).send();
}
