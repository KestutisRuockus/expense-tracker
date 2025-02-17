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
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    const res = await getLastExpenses(pageNumber);
    if (res.success) {
      setExpenses([...expenses, ...(res.expenses || [])]);
      setHasMore(res.hasMore ?? false);
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
  }, [pageNumber]);

  const handleAddExpenseButton = () => {
    redirect(`/expenses/add`);
  };

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  console.log("Page number: " + pageNumber);

  return (
    <div className="w-full px-4">
      <div className="max-w-[860px] mx-auto flex justify-start my-6">
        <Button text="Add Expense" fn={handleAddExpenseButton} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table expenses={expenses} onDelete={handleDelete} />
          <div className="w-fit my-6 mx-auto">
            <Button text="Load more" fn={handleLoadMore} disabled={!hasMore} />
          </div>
        </>
      )}
    </div>
  );
};

export default page;
