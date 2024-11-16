"use client";
import Image from "next/image";
import { useState } from "react";
import lock from "@/../public/lock.svg";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Both fields are required!");
      return;
    } else if (
      formData.username === "admin" &&
      formData.password === "password"
    ) {
      localStorage.setItem("auth", "true");
      window.location.href = "/economic-monitor";
    } else {
      setError("Invalid credentials");
      return;
    }
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md w-80"
      >
        <Image
          className="bg-[#10183c] p-2 rounded-full mx-auto"
          src={lock}
          alt="lock"
          width={38}
          height={38}
        />
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Sign in
        </h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-1 text-white bg-[#10183c] rounded-md hover:bg-[#6153ef]"
        >
          Login
        </button>
      </form>
    </div>
  );
}
