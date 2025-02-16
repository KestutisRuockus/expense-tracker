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

export const deleteExpense = async (expenseId: string) => {
  try {
    await prisma.expense.delete({
      where: { id: expenseId },
    });
    return { success: true, message: "Expense deleted successfully" };
  } catch (error) {
    console.error("Error deleting expense:", error);
    return { success: false, error: "Failed to delete expense" };
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

export const getExpensebyId = async (id: string) => {
  try {
    const expense = await prisma.expense.findUnique({ where: { id } });
    return expense;
  } catch (error) {
    throw new Error("Failed to fetch expense");
  }
};

export const updateExpense = async (
  id: string,
  amount: number,
  category: string
) => {
  try {
    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: { amount, category },
    });
    return { success: true, updatedExpense };
  } catch (error) {
    return { success: false, error: "Failed to update expense" };
  }
};
