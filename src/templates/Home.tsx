import React, { useEffect } from "react";
import { getCurrentUserService } from "../services/userService";

type Props = {};

export default function Home({}: Props) {
  const getCurrentUserApi = async () => {
    const response = await getCurrentUserService();
    console.log("response user ", response);
  };
  // useEffect(() => {
  //   getCurrentUserApi();
  // }, []);
  return (
    <div>
      Home
      <button onClick={getCurrentUserApi}>Get current user</button>
    </div>
  );
}
