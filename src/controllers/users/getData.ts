import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getData(req: Request, res: Response): Promise<Response> {
    const { userId } = req;
    // searching user by id
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            username: true,
            email: true,
            created_at: true,
        },
    });

    return res.status(200).json({ user });
}
