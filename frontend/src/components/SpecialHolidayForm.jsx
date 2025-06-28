import React, { useState, useEffect } from "react";
import {
  addSpecialHoliday,
  getSpecialHolidays,
} from "../services/holidayService";
import HolidayCard from "./HolidayCard";
import "./SpecialHolidayForm.css";

const SpecialHolidayForm = () => {
  const [formData, setFormData] = useState({
    HOLIDAY_NAME: "",
    DATE: "",
    USERID: "",
    FIRMID: "",
    Type: "General",
    Country: "India",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [specialHolidays, setSpecialHolidays] = useState([]);

  const fetchSpecialHolidays = async () => {
    try {
      const data = await getSpecialHolidays();
      setSpecialHolidays(data);
    } catch (error) {
      console.error("❌ Failed to fetch special holidays:", error);
    }
  };

  useEffect(() => {
    fetchSpecialHolidays();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");

    try {
      await addSpecialHoliday(formData);
      setSuccessMsg("✅ Holiday submitted successfully!");
      setFormData({
        HOLIDAY_NAME: "",
        DATE: "",
        USERID: "",
        FIRMID: "",
        Type: "General",
        Country: "India",
      });
      fetchSpecialHolidays();
    } catch (err) {
      console.error("❌ Error submitting holiday:", err);
      setSuccessMsg("❌ Error submitting holiday");
    }
  };

  return (
    <div className="special-holiday-container">
      <div className="form-card">
        <h3>Submit Special Holiday</h3>
        <form onSubmit={handleSubmit} className="special-form">
          <input
            type="text"
            name="HOLIDAY_NAME"
            placeholder="Holiday Name"
            value={formData.HOLIDAY_NAME}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="DATE"
            value={formData.DATE}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="USERID"
            placeholder="User ID"
            value={formData.USERID}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="FIRMID"
            placeholder="Firm ID"
            value={formData.FIRMID}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Type"
            placeholder="General"
            value={formData.Type}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Country"
            placeholder="India"
            value={formData.Country}
            onChange={handleChange}
          />
          <button type="submit">Submit Holiday</button>
          {successMsg && <p className="message">{successMsg}</p>}
        </form>
      </div>

      <h3 style={{ marginTop: "2rem" }}>🎉 All Special Holidays</h3>
      {specialHolidays.length > 0 ? (
        <div className="special-cards">
          {specialHolidays.map((holiday, idx) => (
            <HolidayCard
              key={idx}
              holiday={{
                ...holiday,
                unifiedTitle: holiday.HOLIDAY_NAME || holiday.title,
                unifiedDate: holiday.DATE || holiday.date,
              }}
            />
          ))}
        </div>
      ) : (
        <p>No special holidays yet.</p>
      )}
    </div>
  );
};

export default SpecialHolidayForm;
