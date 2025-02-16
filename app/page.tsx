"use client";

import { useEffect, useState } from "react";
import Table from "./ui/Table";
import Button from "./ui/Button";
import { redirect } from "next/navigation";

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
};

const page = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", amount: 15.15, category: "Food", date: "2015-05-06" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const res = await fetch("/expenses");
        if (res.ok) {
          const data = await res.json();
          setExpenses(data);
        } else {
          console.error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

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
      {loading ? <p>Loading...</p> : <Table expenses={expenses} />}
    </div>
  );
};

export default page;
