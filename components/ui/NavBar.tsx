"use client";
import { Avatar, Box, DropdownMenu, Flex, Link, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { UserContext } from "../../context/UserContext";

export default function NavBar() {
  const context = useContext(UserContext);
  const { user } = context;

  const handleLogout = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.removeItem("user");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <nav className="py-3 border-b">
      <Flex justify="between" align="center" className="container mx-auto">
        <Box>
          <Text size="4" weight="bold" className="hero-font">
            Contri.
          </Text>
        </Box>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Link>
              <Avatar
                size="3"
                fallback={user?.name?.slice(0, 1)}
                radius="full"
              />
            </Link>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="center">
            <DropdownMenu.Item disabled>
              <FaUser className="text-sm" /> {user?.email}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleLogout}>
              <RiLogoutBoxLine /> Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </nav>
  );
}
