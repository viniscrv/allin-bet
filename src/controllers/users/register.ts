import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

export async function register(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
        username: z.string(),
        summary: z.string().nullable(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { username, summary, email, password } = registerBodySchema.parse(
        req.body
    );

    const userExists = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });

    if (userExists) {
        return res.status(403).json({ message: "Already registered user" });
    }

    const password_hash = await hash(password, 6);

    await prisma.user.create({
        data: {
            username,
            email,
            summary,
            password_hash,
        },
    });

    return res.status(201).json({ message: "User created successfully" });
}
