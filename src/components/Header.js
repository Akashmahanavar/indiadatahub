"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import loginLogo from "@/../public/loginLogo.svg";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
    window.location.href = "/";
  };
  return (
    <div className="h-16 bg-[#1c1463] text-white text-xs flex items-center px-8 justify-between">
      <Image
        src="https://economy.indiadatahub.com/static/svg/whitename.svg"
        alt="logo"
        width={150}
        height={34}
      />
      <button
        className="flex items-center gap-2 rounded-md bg-[#10183c] hover:bg-[#6153ef] py-1 px-3"
        onClick={handleLogout}
      >
        <Image src={loginLogo} alt="logo" width={22} height={22} />
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default Header;
