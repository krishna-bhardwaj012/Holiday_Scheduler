import React from "react";
import "./TabsNavigationHoliday.css";

const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    "All",
    "Special",
    "International",
    "Indian",
    "Religious",
    "Regional",
    "Observance",
    "Other",
  ];

  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-card ${activeTab === tab ? "active" : ""}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
