import React from "react";
import "./ExternalHolidayList.css";

const ExternalHolidayList = ({ holidays }) => {
  if (!holidays || holidays.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "24px" }}>No external holidays found.</p>;
  }

  return (
    <div className="external-holiday-wrapper">
      {holidays.map((holiday, index) => (
        <div key={index} className="external-holiday-card">
          <h3>{holiday.HOLIDAY_NAME}</h3>
          <div className="date">{new Date(holiday.DATE).toDateString()}</div>
          <div className="type">{holiday.TYPE}</div>
          <div className="description">{holiday.description}</div>
        </div>
      ))}
    </div>
  );
};

export default ExternalHolidayList;
