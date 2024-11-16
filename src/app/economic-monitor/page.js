"use client";
import DataPanel from "@/components/DataPanel";
import Sidebar from "@/components/Sidebar";
import IndiaData from "@/data/response1.json";
import IMFData from "@/data/response2.json";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState("India");
  const [economicData, setEconomicData] = useState(IndiaData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuthenticated(true);
    } else window.location.href = "/";
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "India") setEconomicData(IndiaData);
    else if (event.target.value === "IMF") setEconomicData(IMFData);
  };

  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="flex w-screen">
      <Sidebar
        categories={economicData.categories}
        selectedOption={selectedOption}
        handleChange={handleChange}
      />
      <div style={{ width: "calc(100% - 300px)" }}>
        <DataPanel records={economicData.frequent} />
      </div>
    </div>
  );
}
