"use client";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function JoinGroup({ params }: { params: { groupId: string } }) {
  useEffect(() => {
    const joinGroup = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_CONTRI_BACKEND}/groups/join-group/${params.groupId}`,
          { withCredentials: true }
        );
        window.location.href = "/dashboard/groups";
      } catch (error) {
        toast.error("Something went wrong, Try again later.", {
          position: "top-center",
          autoClose: 10000,
        });
        console.log(error);
      }
    };

    joinGroup();
  }, []);

  return (
    <div className="flex items-center min-h-screen bg-gradient-to-r from-green-100 via-indigo-100 to-blue-50 px-4 pl-6  md:pl-[150px]">
      <div>
        <Text
          weight="bold"
          className="block mb-4 hero-font text-xl md:text-3xl"
        >
          Contri.
        </Text>
        <h2 className="text-lg mb-4">Joining Group...</h2>

        <Link
          href="/dashboard/groups"
          className="underline block mb-5 text-green-700"
        >
          Go to Dashboard
        </Link>

        <Text size="2" className="text-slate-600">
          By joining the group you agree to our{" "}
          <Link href="#" className="underline">
            Terms of Service and Privacy Policy.
          </Link>
        </Text>
        <div className="mt-5">
          <small className="text-slate-400">
            Built with ❤️ by Sachin in India
          </small>
        </div>
      </div>
    </div>
  );
}
