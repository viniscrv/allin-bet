import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

export async function update(req: Request, res: Response): Promise<Response> {
    const updateBodySchema = z.object({
        username: z.string().min(2).max(255),
        email: z.string().email().min(6).max(255),
        password: z.string().min(6).max(255),
    });
    const { username, email, password } = updateBodySchema.parse(req.body);
    const { userId } = req;

    // update data
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            username,
            email,
            password_hash: await hash(password, 6),
        },
    });

    return res.status(200).json({ message: "User data updated", user });
}
