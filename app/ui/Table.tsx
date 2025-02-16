import { redirect } from "next/navigation";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export type ExpensesProps = {
  expenses: {
    id: string;
    amount: number;
    category: string;
    date: Date;
  }[];
};

const handleUpdateIcon = (id: string) => {
  redirect(`/expenses/${id}`);
};

const Table = ({ expenses }: ExpensesProps) => {
  return (
    <div className="max-w-[860px] mx-auto">
      {expenses.length > 0 ? (
        <table className="w-full table-auto mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-2 border-borderColor">Amount</th>
              <th className="px-4 py-2 border-2 border-borderColor">
                Category
              </th>
              <th className="px-4 py-2 border-2 border-borderColor">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-4 py-2 border-2 border-borderColor text-normalText text-center">
                  {expense.amount}
                </td>
                <td className="px-4 py-2 border-2 border-borderColor text-normalText text-center">
                  {expense.category}
                </td>
                <td className="px-4 py-2 border-2 border-borderColor text-normalText text-center">
                  {new Date(expense.date).toLocaleDateString("lt-LT")}
                </td>
                <td className="px-1 py-2 border-2 border-borderColor">
                  <div className="flex gap-2 justify-center">
                    <FaEdit
                      onClick={() => handleUpdateIcon(expense.id)}
                      className="text-green-500 cursor-pointer hover:scale-125 transition-all duration-200"
                      aria-label="Edit expense"
                    />
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer hover:scale-125 transition-all duration-200"
                      aria-label="Delete expense"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default Table;
