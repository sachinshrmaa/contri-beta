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
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignUp() {
  const [user, setUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `http://contri-api.sachinbuilds.in/api/v1/auth/signup`,
        user,
        { withCredentials: true }
      );
      router.push("/login");
      setIsSubmitting(false);
    } catch (error) {
      toast.error("Something went wrong.", {
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
                Create an account
              </Text>
            </Box>

            <form method="post" onSubmit={handleSubmit}>
              <Box className="mb-5">
                <Text size="1" color="gray">
                  Name
                </Text>
                <TextField.Root
                  placeholder="Enter name"
                  size="2"
                  name="name"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  required
                />
              </Box>

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
                  name="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                />
              </Box>

              <Box className="mb-5">
                <Button type="submit" disabled={isSubmitting}>
                  <Spinner loading={isSubmitting} />
                  {isSubmitting ? "Signing Up" : "Sign Up"}
                </Button>
              </Box>
            </form>

            <Box>
              <Text size="2" className="mb-2" as="p">
                <Link href="/login" className="underline">
                  Already have an account? Log In.
                </Link>
              </Text>

              <Text size="2">
                By clicking sign up, you agree to our{" "}
                <Link href="#" className="underline">
                  Terms of Service and Privacy Policy.
                </Link>
              </Text>
            </Box>
          </Card>
        </Box>
      </Flex>
    </div>
  );
}
