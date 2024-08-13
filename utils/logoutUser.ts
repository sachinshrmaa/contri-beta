import axios from "axios";

export const handleLogout = async () => {
  await axios
    .get(`https://api-contri.sachinbuilds.in/api/v1/auth/logout`, {
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
