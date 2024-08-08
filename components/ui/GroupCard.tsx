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
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GiPalmTree } from "react-icons/gi";
import { toast } from "react-toastify";

interface GroupCardProps {
  name: string;
  id: number;
  type: "trip" | "grocery" | "group";
  handleDelete: () => void;
}

export default function GroupCard({
  name,
  id,
  type,
  handleDelete,
}: GroupCardProps) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [inviteDialog, setInviteDialog] = useState(false);

  const [emails, setEmails] = useState([] as string[]);

  const handleInvite = async () => {
    console.log("invite friends");
  };

  return (
    <div className="mb-6 hover:bg-green-100 rounded-md">
      <Box>
        <Card>
          <div className="p-4 flex items-center gap-6">
            <div>
              {type === "trip" && (
                <GiPalmTree className="text-3xl md:text-6xl text-green-300" />
              )}
              {type === "grocery" && (
                <FaShoppingBasket className="text-3xl md:text-5xl text-yellow-300" />
              )}
              {type === "group" && (
                <FaUsers className="text-3xl md:text-6xl text-slate-300" />
              )}
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <Link href={`/dashboard/groups/${id}`}>
                  <Text as="div" weight="medium">
                    {name}
                  </Text>
                </Link>
              </div>
              <div>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button>
                      <BsThreeDotsVertical className="text-md md:texl:xl text-gray-600" />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end">
                    <DropdownMenu.Item onSelect={() => setInviteDialog(true)}>
                      Invite Friends
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>Edit</DropdownMenu.Item>
                    <DropdownMenu.Item
                      onSelect={() => setDeleteDialog(true)}
                      color="red"
                    >
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </div>
          </div>
        </Card>
      </Box>

      <Dialog.Root open={deleteDialog} onOpenChange={setDeleteDialog}>
        <Dialog.Trigger asChild>
          <div style={{ display: "none" }} />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Delete Group</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Are you sure you want to delete this group? This action cannot be
            undone.
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="red" onClick={() => handleDelete(id)}>
                Delete
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root open={inviteDialog} onOpenChange={setInviteDialog}>
        <Dialog.Trigger asChild>
          <div style={{ display: "none" }} />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Invite your friends</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Invite your friends and family to join this group.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <div>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              {/* <TextArea
                  placeholder="Enter email"
                  name="email"
                  // onChange={(e) => setEmail(e.target.value)}
                /> */}

              <TextField.Root
                placeholder="Enter email"
                name="email"
                onKeyDown={(e) => {
                  if (e.key === ",") {
                    e.preventDefault();
                    const value = e.currentTarget.value;
                    setEmails((prevEmails) => [...prevEmails, value]);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <div className="mt-3">
                {emails.map((email, index) => (
                  <Badge key={index} className="mr-2">
                    {email}
                  </Badge>
                ))}
              </div>
            </div>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleInvite}>Send Invite</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
