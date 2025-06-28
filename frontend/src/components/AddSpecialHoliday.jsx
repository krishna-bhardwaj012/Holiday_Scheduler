import React, { useState, useEffect } from "react";
import { addSpecialHoliday, getSpecialHolidays } from "../services/holidayService";
import HolidayCard from "./HolidayCard";
import "./AddSpecialHoliday.css"; // Optional for styling

export default function AddSpecialHoliday() {
  const [HOLIDAY_DAY_NAME, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [userid, setUserid] = useState("");
  const [firmid, setFirmid] = useState("");
  const [specialHolidays, setSpecialHolidays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSpecials = async () => {
    try {
      const result = await getSpecialHolidays();
      setSpecialHolidays(result);
    } catch (error) {
      console.error("Error fetching special holidays:", error);
    }
  };

  useEffect(() => {
    fetchSpecials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      HOLIDAY_NAME: HOLIDAY_DAY_NAME,
      DATE: date,
      USERID: parseInt(userid),
      FIRMID: parseInt(firmid),
    };

    try {
      const response = await addSpecialHoliday(data);
      alert(response.message || "Holiday added!");
      fetchSpecials(); // refresh the list
      setTitle("");
      setDate("");
      setUserid("");
      setFirmid("");
    } catch (error) {
      console.log("Error adding holiday:", error);
      alert("Failed to add holiday.");
    }
  };

  const filteredSpecials = specialHolidays.filter((h) =>
    (h.HOLIDAY_NAME || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="add-special-container">
      <form onSubmit={handleSubmit} className="holiday-dialog">
        <h2>➕ Submit Special Holiday</h2>
        <input
          type="text"
          placeholder="Holiday Name"
          value={HOLIDAY_DAY_NAME}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="User ID"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Firm ID"
          value={firmid}
          onChange={(e) => setFirmid(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div className="search-and-list">
        <h3>🔍 Search Special Holidays</h3>
        <input
          type="text"
          placeholder="Search by holiday name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="holiday-list">
          {filteredSpecials.length > 0 ? (
            filteredSpecials.map((holiday, idx) => (
              <HolidayCard key={idx} holiday={holiday} />
            ))
          ) : (
            <p>No matching special holidays found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
