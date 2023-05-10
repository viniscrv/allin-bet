import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function deleteUser(req: Request, res: Response) {

  try {
    const { userId } = req;

    // searching user by username
    const userURL = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // if not found, returns 404
    if (!userURL) {
      return res.status(404).json({ message: "User not found." });
    }

    // delete userj
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return res.status(204).send(); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
