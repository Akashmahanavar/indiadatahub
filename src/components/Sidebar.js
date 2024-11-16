"use client";
import { useState } from "react";

const Sidebar = ({ categories, selectedOption, handleChange }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderNestedCategories = (data, parentKey = "") => {
    return Object.keys(data).map((key) => {
      const hasChildren = Object.keys(data[key]).length > 0;
      const uniqueKey = parentKey ? `${parentKey}-${key}` : key;

      return (
        <div key={uniqueKey} className="ml-2">
          <div
            className={`cursor-pointer flex items-center gap-2 py-1 ${
              hasChildren ? "font-semibold" : "font-normal"
            }`}
            onClick={() => hasChildren && toggleExpand(uniqueKey)}
          >
            {hasChildren && <span>{expanded[uniqueKey] ? "▼" : "►"}</span>}
            {key}
          </div>
          {hasChildren && expanded[uniqueKey] && (
            <div className="ml-4 border-l pl-2">
              {renderNestedCategories(data[key], uniqueKey)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-64 p-1 h-screen overflow-auto">
      <div className="rounded bg-blue-100">
        <label htmlFor="options" className="block text-xs px-2 pt-2">
          Categories:
        </label>
        <select
          id="options"
          value={selectedOption}
          onChange={handleChange}
          className="p-2 w-full bg-transparent"
        >
          <option value="India">India</option>
          <option value="IMF">IMF</option>
        </select>
      </div>
      <div className="bg-slate-100 rounded-lg my-2 pt-1">
        <h2 className="text-lg font-semibold p-2 bg-white rounded m-2">
          Homepage
        </h2>
        <div>{renderNestedCategories(categories)}</div>
      </div>
    </div>
  );
};

export default Sidebar;
