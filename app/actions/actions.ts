"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createExpense = async (amount: number, category: string) => {
  try {
    if (amount === 0) {
      throw new Error(`Amount must be over 0,00€`);
    }

    const newExpense = await prisma.expense.create({
      data: { amount, category },
    });

    return { success: true, expense: newExpense };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};
