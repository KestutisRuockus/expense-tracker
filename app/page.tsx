"use client";

import { useEffect, useState } from "react";
import Table from "./ui/Table";
import Button from "./ui/Button";
import { redirect } from "next/navigation";
import { deleteExpense, getLastExpenses } from "./actions/actions";

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: Date;
};

const page = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    const res = await getLastExpenses();
    if (res.success) {
      setExpenses(res.expenses || []);
    } else {
      console.error("Failed to fetch transactions");
    }
    setLoading(false);
  };

  const handleDelete = async (expenseId: string) => {
    const res = await deleteExpense(expenseId);
    if (res.success) {
      fetchExpenses();
    } else {
      console.log("Failed to delete");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpenseButton = () => {
    redirect(`/expenses/add`);
  };

  return (
    <div className="w-full px-4">
      <div className="max-w-[860px] mx-auto flex justify-start my-4">
        <Button text="Add Expense" fn={handleAddExpenseButton} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table expenses={expenses} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default page;
