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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
