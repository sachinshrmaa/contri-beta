"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

export default function Login() {
  const [user, setUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `https://api-contri.sachinbuilds.in/api/v1/auth/login`,
        user,
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      window.location.href = "/dashboard/groups";
      // router.push("/dashboard/groups");
      setIsSubmitting(false);
    } catch (error) {
      toast.error("Invalid email or password", {
        position: "top-center",
        autoClose: 10000,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 bg-gradient-to-r from-green-100 via-indigo-100	to-blue-50">
      <Flex justify="center" align="center" className="h-screen">
        <Box width="450px">
          <Card size="4" className="bg-white">
            <Box className="mb-5">
              <Text
                weight="bold"
                className="block mb-4 hero-font text-xl md:text-3xl"
              >
                Contri.
              </Text>
              <Text weight="medium" className="text-lg md:text-2xl">
                Welcome back
              </Text>
            </Box>
            <form method="post" onSubmit={handleSubmit}>
              <Box className="mb-5">
                <Text size="1" color="gray">
                  Email
                </Text>
                <TextField.Root
                  placeholder="Enter email"
                  size="2"
                  type="email"
                  name="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </Box>

              <Box className="mb-5">
                <Text size="1" color="gray">
                  Password
                </Text>
                <TextField.Root
                  placeholder="Enter password"
                  size="2"
                  type="password"
                  required
                  name="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </Box>

              <Box className="mb-5">
                <Button type="submit" disabled={isSubmitting}>
                  <Spinner loading={isSubmitting} />
                  {isSubmitting ? "Logging in" : "Login"}
                </Button>
              </Box>
            </form>

            <Box>
              <Link
                href="https://forms.gle/Yx3jd73Vm4vgsLFw9"
                className="underline text-sm"
              >
                Don&apos;t have an account? Due to Beta release we had to limit
                the number of users. We'll let you know once we release stable
                version. Until then, please fill this form to get early access.
              </Link>
            </Box>

            {/* <Box>
              <Link href="/signup" className="underline text-sm">
                Don&apos;t have an account? Sign Up
              </Link>
            </Box> */}
          </Card>
        </Box>
      </Flex>
    </div>
  );
}
