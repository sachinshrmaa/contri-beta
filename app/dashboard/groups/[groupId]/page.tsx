"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  Flex,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { FaShoppingBasket } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { GiPalmTree } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { UserContext } from "../../../../context/UserContext";
import moment from "moment-timezone";

export default function GroupLog({ params }: { params: { groupId: string } }) {
  const context = useContext(UserContext);
  const [addExpenseDialog, setAddExpenseDialog] = useState(false);
  const [settleExpenseDialog, setSettleExpenseDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: 0,
    splitRatio: 100,
  });
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    type: "",
  });
  const [groupMembersBalance, setGroupMembersBalance] = useState([]);
  const [settlements, setSettlements] = useState(null);
  const { user } = context;

  useEffect(() => {
    fetchGroupExpenses();
    fetchUserGroupBalance();
    fetchGroupDetails();
  }, []);

  const settleBalances = (users) => {
    const creditors = users.filter((user) => user.balance > 0);
    const debtors = users.filter((user) => user.balance < 0);

    let settlements = [];

    creditors.forEach((creditor) => {
      debtors.forEach((debtor) => {
        if (debtor.balance !== 0 && creditor.balance !== 0) {
          let amount = Math.min(Math.abs(debtor.balance), creditor.balance);

          settlements.push({
            from: debtor.name,
            to: creditor.name,
            amount: amount.toFixed(2),
          });

          debtor.balance += amount; // Reduces the debt
          creditor.balance -= amount; // Reduces the credit
        }
      });
    });

    setSettlements(settlements);
  };

  const handleAddExpense = async () => {
    let payload = {
      groupId: `${params.groupId}`,
      title: expenseData.title,
      amount: expenseData.amount,
      splitRatio: expenseData.splitRatio,
    };

    try {
      setIsLoading(true);
      await axios.post(
        `http://localhost:4000/api/v1/expenses/add-expense`,
        payload,
        { withCredentials: true }
      );
      toast.success("Expense added sucessfully.", {
        position: "top-center",
        autoClose: 10000,
      });
      fetchGroupExpenses();
      fetchUserGroupBalance();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to add expense.", {
        position: "top-center",
        autoClose: 10000,
      });
      console.log(error);
    }
  };

  const fetchGroupExpenses = async () => {
    let payload = {
      groupId: `${params.groupId}`,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:4000/api/v1/expenses/get-expenses`,
        payload,
        { withCredentials: true }
      );

      setExpenses(res?.data?.expenses);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchUserGroupBalance = async () => {
    let payload = {
      groupId: `${params.groupId}`,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:4000/api/v1/expenses/get-balance`,
        payload,
        { withCredentials: true }
      );

      setUserBalance(res?.data?.balance);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchAllUsersGroupBalance = async () => {
    let payload = {
      groupId: `${params.groupId}`,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:4000/api/v1/expenses/members-balance`,
        payload,
        { withCredentials: true }
      );

      setGroupMembersBalance(res?.data);
      settleBalances(res?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchGroupDetails = async () => {
    let payload = {
      groupId: `${params.groupId}`,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:4000/api/v1/groups/get-details`,
        payload,
        { withCredentials: true }
      );

      setGroupDetails({ name: res?.data?.name, type: res?.data?.type });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="sticky top-0 border-b py-2 px-4 w-full flex justify-between items-center bg-white shadow-sm z-50">
        <div className="flex items-center gap-3">
          {groupDetails.type === "trip" && (
            <GiPalmTree className="text-3xl md:text-5xl text-green-300" />
          )}
          {groupDetails.type === "grocery" && (
            <FaShoppingBasket className="text-3xl md:text-5xl text-yellow-300" />
          )}
          {groupDetails.type === "group" && (
            <FaUsers className="text-3xl md:text-6xl text-slate-300" />
          )}
          <h1 className="font-bold">{groupDetails.name}</h1>
        </div>

        <div
          className={`${
            userBalance >= 0 ? "bg-green-200" : "bg-red-100"
          } p-1 px-4 rounded-md text-center cursor-pointer`}
          onClick={() => {
            setSettleExpenseDialog(true);
            fetchAllUsersGroupBalance();
          }}
        >
          <span className="font-bold mb-0 block text-sm">₹ {userBalance} </span>
          <span className="text-xs font-bold text-slate-700">
            You {userBalance > 0 ? "are owed" : "owe"}
          </span>
        </div>
      </div>

      <div className="container">
        <div className="mt-5">
          {expenses.length === 0 && !isLoading && (
            <div className="flex justify-center items-center h-[50vh]">
              <Text color="gray" size="2">
                No expenses. Try adding one.
              </Text>
            </div>
          )}
          {isLoading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <Spinner size="3" mx="auto" />
            </div>
          ) : (
            expenses.map((expense, index) => (
              <div
                key={index}
                className={`flex ${
                  expense.name === user?.name ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`${
                    expense.name === user?.name ? "bg-green-50" : "bg-red-50"
                  } border p-3 rounded-lg w-[70%] flex justify-between shadow-sm`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar fallback={expense.name[0]} size="4" />
                    <div>
                      <p className="text-slate-700 font-medium">
                        {expense.name === user?.name ? "You" : expense.name}
                      </p>
                      <small className="text-slate-500 ">
                        {moment(expense.created_at)
                          .tz("Asia/Kolkata")
                          .format("h:mm a • DD MMM, YYYY")}
                      </small>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <h1
                      className={`font-semibold text-lg ${
                        expense.name === user?.name
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      ₹ {expense.amount}
                    </h1>
                    <p className="text-slate-600 text-sm">{expense.title}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="fixed bottom-[90px] right-[30px]">
          <Link
            href="#"
            onClick={() => setAddExpenseDialog(true)}
            className="bg-green-400 hover:bg-green-500 text-white text-2xl rounded-lg shadow-md w-12 h-12 flex items-center justify-center"
            // className="bg-green-600 hover:bg-green-500 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-md"
          >
            +
          </Link>
        </div>
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
              <TextField.Root
                placeholder="Bread"
                name="title"
                size="1"
                onChange={(e) =>
                  setExpenseData({
                    ...expenseData,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Text as="div" size="1" mb="1" weight="medium">
                Amount
              </Text>
              <TextField.Root
                name="amount"
                size="1"
                type="number"
                onChange={(e) =>
                  setExpenseData({
                    ...expenseData,
                    amount: Number(e.target.value),
                  })
                }
              />
            </div>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleAddExpense}>Add</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root
        open={settleExpenseDialog}
        onOpenChange={setSettleExpenseDialog}
      >
        <Dialog.Trigger>
          <div style={{ display: "none" }} />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title size="3">Settle Expense</Dialog.Title>
          <Dialog.Description size="1" mb="4">
            You can settle the payment by paying/recieving the amount.
          </Dialog.Description>

          <Text as="div" size="1" mb="3" weight="medium">
            {settlements &&
              settlements.map((settlement, index) => (
                <div key={index}>
                  {user.name === settlement.from ? "You" : settlement.from} owes{" "}
                  {user.name === settlement.to ? "You" : settlement.to} ₹{" "}
                  {settlement.amount}
                </div>
              ))}
          </Text>

          <Text as="div" size="1" mb="1">
            By clicking on settle, you are confirming that you've paid/receive
            the money.
          </Text>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={() => {}}>Settle</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
