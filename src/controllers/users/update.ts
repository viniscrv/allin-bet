import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

const updateSchema = z.object({
    username: z.string().min(2).max(255),
    email: z.string().email().min(6).max(255),
    password_hash: z.string().min(6).max(255),
});

export async function update(req: Request,res: Response): Promise<Response> {

    const updateUserData = updateSchema.parse(req.body);
    const { username } = req.params
    const { userId } = req;

    try {
        // searching user by username
        const userURL = await prisma.user.findUnique({
            where: { username },
        });

        // if not found, returns 404
        if (!userURL) {
            return res.status(404).json({ message: "User not found" });
        }

        // updating data
        const user = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            ...updateUserData,
            password_hash: updateUserData.password_hash
              ? await hash(updateUserData.password_hash, 10)
              : undefined,
          },
        });
    
        return res.status(200).json({ message: "User data updated", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }


}