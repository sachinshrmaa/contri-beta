"use client";

import { Box, Button, Card, Text, TextField } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { FaCreditCard, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/UserContext";

export default function Settings() {
  // const router = useRouter();
  const context = useContext(UserContext);
  const { user } = context;

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async () => {
    let payload = {
      name: userDetails.name,
      email: userDetails.email,
      currentPassword: userDetails.currentPassword,
      newPassword: userDetails.newPassword,
    };
    try {
      setIsLoading(true);
      await axios.post(`http://localhost:4000/api/v1/auth/update`, payload, {
        withCredentials: true,
      });
      toast.success("Account updated sucessfully.", {
        position: "top-center",
        autoClose: 10000,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong. Try again later.", {
        position: "top-center",
        autoClose: 10000,
      });
    }
    console.log("update profile");
  };

  const handleDeactivateAccount = async () => {
    // await axios
    //   .get(`http://localhost:4000/api/v1/auth/deactivate`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     // router.push("/login");
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    console.log("deactivate profile");
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
              <Button variant="soft" onClick={() => handleUpdateProfile()}>
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
                onClick={handleDeactivateAccount}
              >
                <FaTrash /> Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
