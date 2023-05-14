import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function deleteUser(req: Request, res: Response) {
    const { userId } = req;

    // Verificar se o usuário possui apostas
    const betCount = await prisma.bet.count({
        where: {
            user_id: userId,
        },
    });

    if (betCount > 0) {
        return res
            .status(400)
            .json({ message: "User has bets and cannot be deleted." });
    }

    // delete user
    await prisma.user.delete({
        where: {
            id: userId,
        },
    });

    return res.status(204).send();
}
