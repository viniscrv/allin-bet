import { Request, Response } from "express";
import { z } from "zod";
import { updateUserBalance } from "../../utils/update-user-balance";

export async function deposit(req: Request, res: Response): Promise<Response> {
    const depositBodySchema = z.object({
        cardNumber: z.string(),
        value: z.number(),
    });

    const { cardNumber, value } = depositBodySchema.parse(req.body);

    if (cardNumber !== "4242.4242.4242.4242") {
        // O ideal seria o número válido estar dentro das váriaveis de ambiente
        return res.status(403).json({ message: "Invalid card number" });
    }

    const id = req.userId;

    const updatedBalance = await updateUserBalance(id, value);

    return res
        .status(200)
        .json({ message: "Successful purchase", updatedBalance });
}
