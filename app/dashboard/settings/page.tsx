"use client";

import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { FaCreditCard, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/UserContext";
import { handleLogout } from "../../../utils/logoutUser";
import { useRouter } from "next/navigation";

export default function Settings() {
  const context = useContext(UserContext);
  const { user } = context;
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const router = useRouter();

  const handleUpdateProfile = async () => {
    let payload = {
      name: userDetails.name,
      email: userDetails.email,
      currentPassword: userDetails.currentPassword,
      newPassword: userDetails.newPassword,
    };
    try {
      setIsLoading(true);
      await axios.post(
        `https://api-contri.sachinbuilds.in/api/v1/auth/update`,
        payload,
        {
          withCredentials: true,
        }
      );
      toast.success("Account updated sucessfully.", {
        position: "top-center",
        autoClose: 10000,
      });
      setIsLoading(false);
      router.push("/dashboard/settings");
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong. Try again later.", {
        position: "top-center",
        autoClose: 10000,
      });
    }
    console.log("Account details", payload);
  };

  const handleDeactivateAccount = async () => {
    try {
      await axios.get(
        `https://api-contri.sachinbuilds.in/api/v1/auth/deactivate`,
        {
          withCredentials: true,
        }
      );
      handleLogout();
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                  defaultValue={user?.name}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
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
                  defaultValue={user?.email}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                />
              </Box>

              <Box>
                <Text size="1" color="gray">
                  Current Password
                </Text>
                <TextField.Root
                  size="2"
                  type="password"
                  name="currentPassword"
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
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
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  required
                />
              </Box>
            </div>

            <div className="mt-4">
              <Button
                variant="soft"
                onClick={() => handleUpdateProfile()}
                loading={isLoading}
              >
                Update
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* <div className="mb-6">
        <Card>
          <div className="p-2">
            <Text size="4" weight="medium" className="flex items-center gap-3">
              Billing <span className="text-green-700 text-xs">BETA</span>
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
      </div> */}

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
              <Button
                color="red"
                variant="soft"
                onClick={() => setDeleteDialog(true)}
              >
                <FaTrash /> Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Dialog.Root open={deleteDialog} onOpenChange={setDeleteDialog}>
        <Dialog.Trigger>
          <div style={{ display: "none" }} />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Delete Account</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="red" onClick={handleDeactivateAccount}>
                Delete
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
