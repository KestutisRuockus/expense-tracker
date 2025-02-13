import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 className="m-6 p-6 border-4 w-fit rounded-xl border-borderColor text-normalText">
        Welcome to{" "}
        <span className="text-titleText font-600">Expense-Tracker</span>
      </h1>
    </>
  );
}
