import axios from "axios";

export const getLoggedInUser = async () => {
  try {
    const res = await axios.get(
      `https://api-contri.sachinbuilds.in/api/v1/auth/`,
      {
        withCredentials: true,
      }
    );
    console.log("from utils", res.data?.user);
    return res?.data?.user;
  } catch (error) {
    console.log(error);
  }
  // const user = JSON.parse(localStorage.getItem("user"));
  // if (user) {
  //   return user;
  // }
};
