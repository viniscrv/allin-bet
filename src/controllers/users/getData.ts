import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getData(req: Request, res: Response): Promise<Response> {

    const  userId  = req.userId;

  try {
    // searching user by id
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        email: true,
        created_at: true,
      },
    });

    // if not found, returns 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}