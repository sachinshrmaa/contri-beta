"use client";

import { Box, Button, Card, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { FaCreditCard, FaTrash } from "react-icons/fa6";

export default function Settings() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = {name:"sachin", email: "sachin@contri.com"};

  return (
    <div className="container">
      <div className="mt-5 mb-6">
        <Text weight="medium" className="flex items-center gap-3">
          Settings
        </Text>
      </div>

      <div className="mb-6">
        <Card>
          <div className="p-2">
            <Text size="4" weight="medium" className="flex items-center gap-3">
              Profile
            </Text>
            <Text size="2" className="mt-2">
              Update your profile.
            </Text>

            <div className="grid grid-cols-2 mt-1 gap-2 mb-3">
              <Box>
                <Text size="1" color="gray">
                  Name
                </Text>
                <TextField.Root
                  size="2"
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  required
                />
              </Box>

              <Box>
                <Text size="1" color="gray">
                  Email
                </Text>
                <TextField.Root
                  size="2"
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  required
                />
              </Box>

              <Box>
                <Text size="1" color="gray">
                  Current password
                </Text>
                <TextField.Root
                  size="2"
                  type="password"
                  name="currentPassword"
                  required
                />
              </Box>

              <Box>
                <Text size="1" color="gray">
                  New Password
                </Text>
                <TextField.Root
                  size="2"
                  type="password"
                  name="newPassword"
                  required
                />
              </Box>
            </div>

            <div className="mt-4">
              <Button variant="soft">Update</Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <div className="p-2">
            <Text size="4" weight="medium" className="flex items-center gap-3">
              Billing
            </Text>
            <Text size="2" className="mt-2">
              Premium starts at <span className="font-bold">₹ 49/month</span>.
            </Text>

            <div className="my-5">
              <p>✔️ Unlimited groups</p>
              <p>✔️ Unlimited expenses</p>
              <p>✔️ Track payments</p>
              <p>✔️ Premium Support</p>
              <p>✔️ Early access</p>
            </div>

            <div className="mt-4">
              <Button variant="soft">
                <FaCreditCard /> Upgrade to Premium
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <div className="p-2">
            <Text size="4" weight="medium" className="flex items-center gap-3">
              Account
            </Text>
            <Text size="2" className="mt-2">
              Delete your account.
            </Text>

            <div className="mt-4">
              <Button color="red" variant="soft">
                <FaTrash /> Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
