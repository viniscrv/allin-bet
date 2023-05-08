import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { compare } from "bcryptjs";

export async function authenticate(
    req: Request,
    res: Response
): Promise<Response> {
    const authenticateBodySchema = z.object({
        username: z.string(),
        password: z.string(),
    });

    const { username, password } = authenticateBodySchema.parse(req.body);

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({ message: "Successfully authenticated" });
}
