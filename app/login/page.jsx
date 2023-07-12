"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");

  console.log(username);

  const handleLogin = async () => {
    const response = await axios.post("/api/auth", { username: username });
    const data = response.data.data;
    console.log(data)
    if (data === undefined) {
      alert("enter a valid username");
    } else {
      sessionStorage.setItem("UserId", `${data.userId}`);
      sessionStorage.setItem("Username", `${data.username}`);
      router.push("./")
    }
  };
  return (
    <div>
      <input
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        login
      </button>
    </div>
  );
};

export default login;
