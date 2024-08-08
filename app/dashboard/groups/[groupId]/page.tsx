"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import {
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  DropdownMenu,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { FaShoppingBasket } from "react-icons/fa";

const tempExpense = [
  {
    expense_id: 1,
    title: "Bread",
    amount: 100,
    paid_by: "You",
    created_at: "2021-09-01",
  },
  {
    expense_id: 2,
    title: "Drinks",
    amount: 500,
    paid_by: "Manish",
    created_at: "2021-09-01",
  },
  {
    expense_id: 3,
    title: "Hotel",
    amount: 700,
    paid_by: "Puja",
    created_at: "2021-09-01",
  },
  {
    expense_id: 4,
    title: "Cab",
    amount: 450,
    paid_by: "You",
    created_at: "2021-09-01",
  },
  {
    expense_id: 5,
    title: "Drinks",
    amount: 500,
    paid_by: "Manish",
    created_at: "2021-09-01",
  },
  {
    expense_id: 6,
    title: "Hotel",
    amount: 700,
    paid_by: "Puja",
    created_at: "2021-09-01",
  },
  {
    expense_id: 7,
    title: "Drinks",
    amount: 500,
    paid_by: "You",
    created_at: "2021-09-01",
  },
  {
    expense_id: 8,
    title: "Hotel",
    amount: 700,
    paid_by: "Puja",
    created_at: "2021-09-01",
  },
];

export default function GroupLog({ params }: { params: { slug: string } }) {
  const [addExpenseDialog, setAddExpenseDialog] = useState(false);
  return (
    <>
      <div className="fixed top-0 border-b py-2 px-4 w-full flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <FaShoppingBasket className="text-3xl md:text-5xl text-yellow-300" />
          <h1 className="font-bold">Grocery</h1>
        </div>

        <div className="bg-green-200 p-1 px-4 rounded-md text-center">
          <span className="font-bold mb-0 block text-sm">₹ 100 </span>
          <span className="text-xs font-bold text-slate-700">You are owed</span>
        </div>
      </div>
      <div className="container">
        <div className="my-[100px]">
          {tempExpense.map((expense, index) => (
            <div
              key={index}
              className={`flex ${
                expense.paid_by === "You" ? "justify-end" : "justify-start"
              } mb-3`}
            >
              <div
                className={`${
                  expense.paid_by === "You" ? "bg-green-50" : "bg-red-50"
                } p-3 rounded-lg w-[70%] flex justify-between shadow`}
              >
                <div>
                  <p className="text-slate-700 font-medium">
                    {expense.paid_by}
                  </p>
                  <small className="text-slate-500">{expense.created_at}</small>
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <h1 className="font-bold text-xl text-slate-800">
                    ₹ {expense.amount}
                  </h1>
                  <p className="text-slate-600 text-sm">{expense.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-[90px] right-[30px]">
          <Link
            href="#"
            onClick={() => setAddExpenseDialog(true)}
            className="bg-green-600 hover:bg-green-500 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-md"
          >
            +
          </Link>
        </div>

        <Dialog.Root open={addExpenseDialog} onOpenChange={setAddExpenseDialog}>
          <Dialog.Trigger>
            <div style={{ display: "none" }} />
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title size="3">Add Expense</Dialog.Title>
            <Dialog.Description size="1" mb="4">
              All the members will be notified about your expense.
            </Dialog.Description>

            <Flex direction="row" gap="3">
              <div>
                <Text as="div" size="1" mb="1" weight="medium">
                  Title
                </Text>
                <TextField.Root placeholder="Bread" name="title" size="1" />
              </div>
              <div>
                <Text as="div" size="1" mb="1" weight="medium">
                  Amount
                </Text>
                <TextField.Root placeholder="Bread" name="amount" size="1" />
              </div>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" size="1">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button onClick={() => {}} size="1">
                  Add
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>
  );
}
