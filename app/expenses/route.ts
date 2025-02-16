// import { getExpense, createExpense } from "../lib/expense";

// export const GET = async () => {
//   try {
//     const expense = await getExpense();
//     return new Response(JSON.stringify(expense), { status: 200 });
//   } catch (error) {
//     return new Response("Error fetching transactions", { status: 500 });
//   }
// };

// export const POST = async (req: Request) => {
//   const { amount, category, date } = await req.json();

//   try {
//     const newExpense = await createExpense(amount, category, date);
//     return new Response(JSON.stringify(newExpense), { status: 200 });
//   } catch (error) {
//     return new Response("Error creating transaction " + error, { status: 500 });
//   }
// };
