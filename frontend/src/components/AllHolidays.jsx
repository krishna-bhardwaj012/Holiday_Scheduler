import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HolidayCard from "./HolidayCard";
import "./AllHolidays.css";

const AllHolidays = ({
  holidays = [],
  specialHolidays = [],
  externalHolidays = [],
  searchTerm = "",
}) => {
  const [allHolidays, setAllHolidays] = useState([]);
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);

  useEffect(() => {
    const normalize = (holiday) => ({
      ...holiday,
      unifiedDate: holiday.DATE || holiday.date || "",
      unifiedTitle:
        holiday.HOLIDAY_NAME ||
        holiday.title ||
        holiday.HOLIDAY_DAY_NAME ||
        holiday.name ||
        "Unnamed Holiday",
    });

    const combined = [
      ...holidays.map(normalize),
      ...specialHolidays.map(normalize),
      ...externalHolidays.map(normalize),
    ].sort((a, b) => new Date(a.unifiedDate) - new Date(b.unifiedDate));

    setAllHolidays(combined);

    const now = new Date();
    const next30 = new Date();
    next30.setDate(now.getDate() + 30);

    const upcoming = combined.filter((h) => {
      const d = new Date(h.unifiedDate);
      return d >= now && d <= next30;
    });

    setUpcomingHolidays(upcoming);
  }, [holidays, specialHolidays, externalHolidays]);

  const lowerSearch = searchTerm.toLowerCase();

  const filteredAll = allHolidays.filter((h) =>
    h.unifiedTitle.toLowerCase().includes(lowerSearch)
  );

  const filteredUpcoming = upcomingHolidays.filter((h) =>
    h.unifiedTitle.toLowerCase().includes(lowerSearch)
  );

  return (
    <div className="all-holidays-layout">
      {/* Calendar on the right */}
      <div className="calendar-side">
        <h3>🗓️ Calendar View</h3>
        <Calendar
          tileContent={({ date }) => {
            const d = date.toISOString().split("T")[0];
            const match = allHolidays.find((h) =>
              (h.unifiedDate || "").startsWith(d)
            );
            return match ? <p style={{ color: "red", margin: 0 }}>•</p> : null;
          }}
        />
      </div>

      {/* Holidays list on the left */}
      <div className="holiday-list">
        <h2>📅 All Holidays</h2>
        {filteredAll.length > 0 ? (
          filteredAll.map((holiday, idx) => (
            <HolidayCard key={idx} holiday={holiday} />
          ))
        ) : (
          <p>No holidays match your search.</p>
        )}

        <h3 style={{ marginTop: "2rem" }}>🕒 Upcoming Holidays (Next 30 Days)</h3>
        {filteredUpcoming.length > 0 ? (
          filteredUpcoming.map((holiday, idx) => (
            <HolidayCard key={`up-${idx}`} holiday={holiday} />
          ))
        ) : (
          <p>No upcoming holidays in the next 30 days matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default AllHolidays;
