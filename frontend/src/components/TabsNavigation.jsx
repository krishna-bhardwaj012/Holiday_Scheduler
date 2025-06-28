import React from "react";
import "./TabsNavigation.css";



const specialTypes = [
  "National Holidays",
  "Juneteenth National Independence Day  (USA)",
  "Flag Day (USA)",
  "Father’s Day",
  "Windrush Day  (UK)",

"UN Special Days",
  "Global Day of Parents ",
 


"WHO Special Days",
  "WHO Special Days",
 




];

const countries = [
  "India", "USA", "UK", "Germany", "France", "Italy", "Spain", "Australia",
  "Canada", "Brazil", "Russia", "China", "Japan", "South Korea", "South Africa",
  "Mexico", "Netherlands", "Sweden", "Norway", "Argentina"
];

const TabsNavigation = ({
  selectedTab,
  onTabChange,
  selectedSpecialType,
  onSpecialTypeChange,
  selectedCountry,
  onCountryChange,
}) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center" }}>
      {["all", "special", "international", "indian","Religious", "Regional","Observance", "Other"].map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            padding: "8px 12px",
            backgroundColor: selectedTab === tab ? "#007bff" : "#ccc",
            color: selectedTab === tab ? "#fff" : "#000",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}

      {selectedTab === "special" && (
        <select
          value={selectedSpecialType}
          onChange={(e) => onSpecialTypeChange(e.target.value)}
        >
          <option value="">-- Select Special Type --</option>
          {specialTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      )}

      {selectedTab === "international" && (
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default TabsNavigation;
