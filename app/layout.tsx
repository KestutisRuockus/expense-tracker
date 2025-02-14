import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./ui/Navbar";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Let's find out where you are wasting your money",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
