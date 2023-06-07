import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export async function updateUserBalance(id: string, value: number) {
    const userBalance = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            balance: true,
        },
    });

    const balance = userBalance?.balance;
    const updatedBalance = new Prisma.Decimal(Number(balance) + value);

    await prisma.user.update({
        where: {
            id,
        },
        data: {
            balance: updatedBalance,
        },
    });

    return updatedBalance;
}
