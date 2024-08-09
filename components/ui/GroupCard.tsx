import {
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  DropdownMenu,
  Flex,
  Select,
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
  created_by: string;
  handleDelete: (id: number) => Promise<void>;
  handleUpdate: (
    { name, type }: { name: string; type: string },
    id: string
  ) => Promise<void>;
}

export default function GroupCard({
  name,
  id,
  type,
  created_by,
  handleDelete,
  handleUpdate,
}: GroupCardProps) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [inviteDialog, setInviteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [emails, setEmails] = useState([] as string[]);
  const [groupDetails, setGroupDetails] = useState({
    name: name,
    type: type,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleInvite = async () => {
    console.log("invite friends");
  };

  // const handleUpdateGroupDetails = async () => {
  //   try {
  //     setIsUpdating(true);
  //     await axios.post(
  //       `http://localhost:4000/api/v1/groups/edit-group/${id}`,
  //       groupDetails,
  //       { withCredentials: true }
  //     );
  //     toast.success("Group updated sucessfully.", {
  //       position: "top-center",
  //       autoClose: 10000,
  //     });
  //     setIsUpdating(false);
  //   } catch (error: any) {
  //     setIsUpdating(false);
  //     console.log(error);
  //     toast.success("Failed to update details.", {
  //       position: "top-center",
  //       autoClose: 10000,
  //     });
  //   }
  // };

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
              {user.user_id === created_by ? (
                <div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <button>
                        <BsThreeDotsVertical className="text-md md:texl:xl text-gray-600" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="end">
                      <DropdownMenu.Item onSelect={() => setInviteDialog(true)}>
                        Invite Friends
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onSelect={() => setEditDialog(true)}>
                        Edit Group
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onSelect={() => setDeleteDialog(true)}
                        color="red"
                      >
                        Leave Group
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
              ) : (
                <div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <button>
                        <BsThreeDotsVertical className="text-md md:texl:xl text-gray-600" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="end">
                      <DropdownMenu.Item
                        onSelect={() => setDeleteDialog(true)}
                        color="red"
                      >
                        Leave Group
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Box>

      <Dialog.Root open={deleteDialog} onOpenChange={setDeleteDialog}>
        <Dialog.Trigger>
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
        <Dialog.Trigger>
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

              <TextField.Root
                placeholder="Press ',' to add multiple emails."
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

      <Dialog.Root open={editDialog} onOpenChange={setEditDialog}>
        <Dialog.Trigger>
          <div style={{ display: "none" }} />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Edit Group Details</Dialog.Title>

          <Flex direction="column" gap="3">
            <div>
              <Text as="div" size="2" mb="1" weight="medium">
                Group Name
              </Text>
              <TextField.Root
                defaultValue={groupDetails.name}
                name="groupName"
                onChange={(e) =>
                  setGroupDetails((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div>
              <Text as="div" size="2" mb="1" weight="medium">
                Group Type
              </Text>

              <Select.Root
                defaultValue={groupDetails.type}
                onValueChange={(val) =>
                  setGroupDetails((prev) => ({
                    ...prev,
                    type: val,
                  }))
                }
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Group Type</Select.Label>
                    <Select.Item value="trip">Trip</Select.Item>
                    <Select.Item value="grocery">Grocery</Select.Item>
                    <Select.Item value="group">Other</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={() => handleUpdate(groupDetails, id)}>
                Update
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
