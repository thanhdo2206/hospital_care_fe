import React, { useEffect } from "react";
import { getCurrentUserService, logoutService } from "../services/userService";

type Props = {};

export default function Home({}: Props) {
  const getCurrentUserApi = async () => {
    const response = await getCurrentUserService();
    console.log("response user ", response);
  };

  const logoutUserApi = async () => {
    await logoutService();
  };
  // useEffect(() => {
  //   getCurrentUserApi();
  // }, []);
  return (
    <div>
      Home
      <button onClick={getCurrentUserApi}>Get current user</button>
      <button onClick={logoutUserApi}>Logout</button>
    </div>
  );
}
