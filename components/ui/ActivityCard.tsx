"use client";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import moment from "moment-timezone";

interface ActivityCardProps {
  user: string;
  amount: number;
  category: string;
  group: string;
  timestamp: string;
}

export default function ActivityCard({
  user,
  amount,
  category,
  group,
  timestamp,
}: ActivityCardProps) {
  const context = useContext(UserContext);
  const { user: loggedUser } = context;

  return (
    <div className="mb-4 hover:bg-green-100 rounded-md">
      <Card>
        <Flex gap="3" align="center">
          <Avatar fallback={user[0]} size="4" />
          <Flex direction="column">
            <Text className="text-slate-600">
              <span className="text-slate-900">
                {loggedUser?.name === user ? "You" : user}
              </span>{" "}
              paid
              <span
                className={`${
                  loggedUser?.name === user ? "text-green-600" : "text-red-600"
                }`}
              >
                {" "}
                ₹ {amount}
              </span>{" "}
              for <span className="text-slate-950"> {category} </span> in
              <span className="text-slate-950"> {group} </span>.
            </Text>
            <Text size="1" color="gray">
              {moment(timestamp)
                .tz("Asia/Kolkata")
                .format("h:mm a • DD MMM, YYYY")}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}
