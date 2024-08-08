"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Text,
  Dialog,
  TextField,
  Spinner,
  Tooltip,
  IconButton,
  Select,
} from "@radix-ui/themes";
import GroupCard from "../../../components/ui/GroupCard";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosInformationCircleOutline, IoMdAdd } from "react-icons/io";
import Link from "next/link";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("");

  useEffect(() => {
    console.log(groupName);
  }, [groupName]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/groups/list-groups",
        {
          withCredentials: true,
        }
      );
      setGroups(res?.data?.groups);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleAddGroup = async () => {
    let payload = {
      name: groupName,
      type: groupType,
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/groups/create-group",
        payload,
        { withCredentials: true }
      );

      console.log(res.data);
      toast.success("Group created sucessfully.", {
        position: "top-center",
        autoClose: 10000,
      });
      await fetchGroups();
      setIsSubmitting(false);
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error("Failed to create group.", {
        position: "top-center",
        autoClose: 10000,
      });
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    let payload = {
      groupId: id,
    };
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/groups/leave-group`,
        payload,
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success("Group deleted successfully", {
        position: "top-center",
        autoClose: 5000,
      });
      await fetchGroups();
    } catch (error: any) {
      console.log(error);
      toast.error("Couldn't delete group. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="container">
      <Flex justify="between" align="center" className="mt-5 mb-8">
        <Text weight="medium" className="flex items-center gap-3">
          Groups
          <Tooltip content="Groups are your squad! Create one to split expenses with friends, roomies, or whoever you share costs with. Add members, track who paid what, and settle up easily.">
            <Link href="#">
              <IoIosInformationCircleOutline />
            </Link>
          </Tooltip>
        </Text>

        <Dialog.Root>
          <Dialog.Trigger>
            <Button disabled={isSubmitting} size="2">
              <Spinner size="1" loading={isSubmitting} />
              <IoMdAdd className="font-bold text-lg" />
              Add Group
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Create a Group</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Add your friends to your group and split payments bhasar free with
              Contri.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <div>
                <Text as="div" mb="1" weight="bold">
                  Group Name
                </Text>
                <TextField.Root
                  defaultValue="Grocery"
                  placeholder="Enter group name"
                  name="groupName"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              <div>
                <Text as="div" mb="1" weight="bold">
                  Group Type
                </Text>

                <Select.Root
                  defaultValue="group"
                  onValueChange={(val) => setGroupType(val)}
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
                <Button onClick={handleAddGroup}>Save</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>

      <div>
        {isLoading ? (
          <div className="mt-20">
            <Spinner size="3" mx="auto" />
          </div>
        ) : (
          groups?.map((group) => (
            <GroupCard
              name={group.name}
              id={group.group_id}
              type={group.type}
              handleDelete={handleDelete}
            />
          ))
        )}

        {groups.length === 0 && !isLoading && (
          <div className="mt-20 text-center">
            <Text color="gray" size="2">
              No groups found. Create a group to get started.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
