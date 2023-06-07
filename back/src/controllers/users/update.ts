import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

export async function update(req: Request, res: Response): Promise<Response> {
    const updateBodySchema = z.object({
        username: z.string().min(2).max(255).nullable(),
        summary: z.string().min(2).max(255).nullable(),
        email: z.string().email().min(6).max(255).nullable(),
        password: z.string().min(6).max(255).nullable(),
    });
    const { username, summary, email, password } = updateBodySchema.parse(
        req.body
    );
    const { userId } = req;

    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            username: username ? username : undefined,
            summary: summary ? summary : undefined,
            email: email ? email : undefined,
            password_hash: password ? await hash(password, 6) : undefined,
        },
    });

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            username: true,
            summary: true,
            email: true,
        },
    });

    return res.status(200).json({ message: "User data updated", user });
}
