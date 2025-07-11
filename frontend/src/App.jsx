import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import AllHolidays from "./components/AllHolidays";
import UpcomingHolidays from "./components/UpcomingHolidays";
import HolidayStats from "./components/HolidayStats";
import SpecialHolidayForm from "./components/SpecialHolidayForm";
import SearchBar from "./components/SearchBar";

import {
  getHOLIDAY_DAYS_LIST,
  getSpecialHolidays,
  addSpecialHoliday,
  getExternalHolidays,
} from "./services/holidayService";

import "./App.css";

function App() {
  const [holidayList, setHolidayList] = useState([]);
  const [specialHolidayList, setSpecialHolidayList] = useState([]);
  const [externalHolidayList, setExternalHolidayList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [holidayData, specialData] = await Promise.all([
        getHOLIDAY_DAYS_LIST(),
        getSpecialHolidays(),
      ]);
      setHolidayList(holidayData);
      setSpecialHolidayList(specialData);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  const handleAddSpecialHoliday = async (data) => {
    await addSpecialHoliday(data);
    await fetchAll();
  };

  const handleLoadExternal = async () => {
    try {
      const data = await getExternalHolidays(countryCode, year);
      setExternalHolidayList(data);
    } catch (err) {
      console.error("❌ Error fetching external holidays:", err);
    }
  };

  return (
    <div className="container">
      <h1>🗓️ Holiday Scheduler</h1>

      {/* ✅ Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* ✅ Country + Year Filter */}
      <div className="filter-controls">
        <label>
          Country:
          <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
            <option value="US">🇺🇸 US</option>
            <option value="GB">🇬🇧 UK</option>
            <option value="UN">🌐 UN</option>
            <option value="WHO">🏥 WHO</option>
          </select>
        </label>

        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </label>

        <button onClick={handleLoadExternal}>🌍 Load External Holidays</button>
      </div>

      {/* ✅ Navigation Tabs as Buttons */}
      <div className="nav-buttons">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-btn active" : "nav-btn")}>
          All
        </NavLink>
        <NavLink to="/upcoming" className={({ isActive }) => (isActive ? "nav-btn active" : "nav-btn")}>
          Upcoming
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => (isActive ? "nav-btn active" : "nav-btn")}>
          Statistics
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "nav-btn active" : "nav-btn")}>
          Add Special
        </NavLink>
      </div>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <AllHolidays
              holidays={holidayList}
              specialHolidays={specialHolidayList}
              externalHolidays={externalHolidayList}
              searchTerm={searchTerm}
            />
          }
        />
        <Route
          path="/upcoming"
          element={
            <UpcomingHolidays
              holidays={holidayList}
              specialHolidays={specialHolidayList}
              externalHolidays={externalHolidayList}
              searchTerm={searchTerm}
            />
          }
        />
        <Route
          path="/stats"
          element={
            <HolidayStats
              holidays={holidayList}
              specialHolidays={specialHolidayList}
              externalHolidays={externalHolidayList}
            />
          }
        />
        <Route
          path="/add"
          element={<SpecialHolidayForm onSubmit={handleAddSpecialHoliday} />}
        />
      </Routes>
    </div>
  );
}

export default App;
