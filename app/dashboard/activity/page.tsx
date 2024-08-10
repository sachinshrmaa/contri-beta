"use client";
import ActivityCard from "../../../components/ui/ActivityCard";
import { Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Activity() {
  const [userActivities, setUserActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserActivities();
  }, []);

  const fetchUserActivities = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://contri-api.sachinbuilds.in/api/v1/activities/all`,
        { withCredentials: true }
      );
      setUserActivities(res?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="mt-5 mb-8">
        <Text weight="medium" className="flex items-center gap-3">
          Activity
        </Text>
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Spinner size="3" mx="auto" />
          </div>
        ) : (
          userActivities.map((data) => (
            <ActivityCard
              key={data.expense_id}
              user={data.paid_by_name}
              amount={data.amount}
              category={data.title}
              group={data.group_name}
              timestamp={data.created_at}
            />
          ))
        )}
      </div>

      {/* <div className="my-6 text-center">
        <Button variant="soft">
          Load more
        </Button>
      </div> */}
    </div>
  );
}
