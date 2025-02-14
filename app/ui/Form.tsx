"use client";

import { categories } from "@/constants/categories";
import React, { useState } from "react";
import Button from "./Button";
import { redirect } from "next/navigation";

type FormProps = {
  isUpdate?: boolean;
  expenseId?: string;
};

const Form = ({ isUpdate, expenseId }: FormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`FormSubmit`);
  };

  const returnToMainRoute = (e: React.FormEvent) => {
    e.preventDefault();
    redirect("/");
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
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-xs text-titleText font-500">
          Category
        </label>
        <select id="category" className="outline-none">
          {categories.map((category, index) => (
            <CategoryOption
              key={`${category}-${index}`}
              category={category}
              index={index}
            />
          ))}
        </select>
      </div>
      <div className="flex gap-5">
        <Button text="Add New Expense" fn={handleFormSubmit} />
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
