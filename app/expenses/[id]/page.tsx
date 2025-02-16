"use client";

import Form from "@/app/ui/Form";
import { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const isUpdateParam = new URLSearchParams(window.location.search).get(
      "isUpdate"
    );
    setIsUpdate(isUpdateParam === "true");
  }, []);

  return <Form isUpdate={isUpdate} expenseId={id} />;
};

export default page;
