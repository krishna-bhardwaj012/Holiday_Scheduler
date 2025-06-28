import React from "react";
import "./HolidayStats.css";

const HolidayStats = ({
  holidays = [],
  specialHolidays = [],
  externalHolidays = [],
}) => {
  const totalRegular = holidays.length;
  const totalSpecial = specialHolidays.length;
  const totalExternal = externalHolidays.length;
  const totalCombined = totalRegular + totalSpecial + totalExternal;

  const today = new Date();
  const next30 = new Date();
  next30.setDate(today.getDate() + 30);

  const normalize = (h) => new Date(h.DATE || h.date || "");

  const countUpcoming = [...holidays, ...specialHolidays, ...externalHolidays].filter((h) => {
    const date = normalize(h);
    return date >= today && date <= next30;
  }).length;

  return (
    <div className="holiday-stats">
      <h3>📊 Holiday Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Regular Holidays</p>
          <h2>{totalRegular}</h2>
        </div>
        <div className="stat-card">
          <p>Total Special Holidays</p>
          <h2>{totalSpecial}</h2>
        </div>
        <div className="stat-card">
          <p>Total External Holidays</p>
          <h2>{totalExternal}</h2>
        </div>
        <div className="stat-card">
          <p>Total Holidays (All)</p>
          <h2>{totalCombined}</h2>
        </div>
        <div className="stat-card">
          <p>Upcoming (Next 30 Days)</p>
          <h2>{countUpcoming}</h2>
        </div>
      </div>
    </div>
  );
};

export default HolidayStats;
