"use client";

import { categories } from "@/constants/categories";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  createExpense,
  getExpensebyId,
  updateExpense,
} from "../actions/actions";

type FormProps = {
  isUpdate?: boolean;
  expenseId?: string;
};

const Form = ({ isUpdate, expenseId }: FormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>(categories[0]);
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const createExpenseRecord = async () => {
    const result = await createExpense(amount, category);
    if (result?.success) {
      setMessage("Expense successfully added!");
      setTimeout(() => {
        returnToMainRoute();
      }, 3000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount !== 0 && category !== "Select Cagetory") {
      try {
        if (isUpdate) {
          updateExpenseRecord();
        } else {
          createExpenseRecord();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setAmount(0);
        setCategory(categories[0]);
      }
    } else {
      if (amount === 0) {
        setMessage(`Amount must be greater than 0.00€!`);
      } else {
        setMessage(`Category is NOT selected`);
        console.log(`Category is NOT selected`);
      }
    }
  };

  const updateExpenseRecord = async () => {
    if (expenseId) {
      const res = await updateExpense(expenseId, amount, category);
      if (res.success) {
        setMessage("Expense successfully updated!");
        setTimeout(() => {
          returnToMainRoute();
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (isUpdate && expenseId) {
      const fetchSingleExpensebyId = async (id: string) => {
        try {
          const expense = await getExpensebyId(id);
          if (expense) {
            setAmount(expense.amount);
            setCategory(expense.category);
          }
        } catch (error) {
          setMessage("Failed to update expense record");
        }
      };
      fetchSingleExpensebyId(expenseId);
    }
  }, [isUpdate, expenseId]);

  const returnToMainRoute = () => {
    router.push("/");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-[480px] mx-auto border-2 border-borderColor rounded-xl flex flex-col gap-4 mt-20 p-8"
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="text-xs text-titleText font-500">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min={0}
          placeholder="0.00 €"
          className="text-sm pl-2 w-full outline-none"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-xs text-titleText font-500">
          Category
        </label>
        <select
          id="category"
          className="outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <CategoryOption
              key={`${category}-${index}`}
              category={category}
              index={index}
            />
          ))}
        </select>
      </div>
      <p
        className={`text-xs text-titleText font-700 ${
          message ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        {message}
      </p>
      <div className="flex gap-5">
        <Button
          text={isUpdate ? "Update Expense" : "Add New Expense"}
          fn={handleFormSubmit}
        />
        <Button text="Return to Expenses list" fn={returnToMainRoute} />
      </div>
    </form>
  );
};

const CategoryOption = ({
  category,
  index,
}: {
  category: string;
  index: number;
}) => {
  return (
    <option
      disabled={index === 0}
      value={category}
      className="pl-2 rounded-xl outline-none"
    >
      {category}
    </option>
  );
};

export default Form;
