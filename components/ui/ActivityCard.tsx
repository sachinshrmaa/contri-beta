import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

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
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="mb-4 hover:bg-green-100 rounded-md">
      <Card>
        <Flex gap="3" align="center">
          <Avatar fallback={user[0]} size="4" />
          <Flex direction="column">
            <Text>
              <span className="font-semibold">
                {loggedUser.name === user ? "You" : user}
              </span>{" "}
              paid
              <span
                className={`${
                  loggedUser.name === user ? "text-green-600" : "text-red-600"
                }`}
              >
                {" "}
                ₹ {amount}
              </span>{" "}
              for <span className="font-semibold"> {category} </span> in
              <span className="font-semibold"> {group} </span>.
            </Text>
            <Text size="1" color="gray">
              {timestamp}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}
