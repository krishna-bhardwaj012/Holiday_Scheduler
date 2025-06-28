import React from "react";
import HolidayCard from "../components/HolidayCard"; // ✅ Correct path
import "./UpcomingHolidays.css";

const UpcomingHolidays = ({
  holidays = [],
  specialHolidays = [],
  externalHolidays = [],
  searchTerm = "",
}) => {
  const today = new Date();
  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);

  const isWithinNext30Days = (dateStr) => {
    const holidayDate = new Date(dateStr);
    return holidayDate >= today && holidayDate <= next30Days;
  };

  // Normalize structure
  const normalize = (h) => ({
    unifiedTitle: h.HOLIDAY_NAME || h.title || "",
    unifiedDate: h.DATE || h.date || "",
    ...h,
  });

  const allCombined = [
    ...holidays,
    ...specialHolidays,
    ...externalHolidays,
  ].map(normalize);

  const filtered = allCombined
    .filter((h) => isWithinNext30Days(h.unifiedDate))
    .filter((h) =>
      h.unifiedTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.unifiedDate) - new Date(b.unifiedDate));

  return (
    <div className="upcoming">
      <h3>📅 Upcoming Holidays (Next 30 Days)</h3>
      {filtered.length === 0 ? (
        <p>No holidays in the next 30 days.</p>
      ) : (
        <div className="upcoming-cards">
          {filtered.map((holiday, index) => (
            <HolidayCard key={index} holiday={holiday} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingHolidays;
