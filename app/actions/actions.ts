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

export const getLastExpenses = async () => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: "desc" },
      take: 7,
    });
    return { success: true, expenses };
  } catch (error) {
    console.error("Error fetching last expenses:", error);
    return { success: false, error: "Failed to fetch last expenses" };
  }
};
