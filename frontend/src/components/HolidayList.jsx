import React from "react";
import HolidayCard from "./HolidayCard";

const HolidayList = ({ holidays = [], onDelete }) => {
  if (!Array.isArray(holidays)) return null;

  return (
    <div className="holiday-list">
      {holidays.map((holiday, index) => {
        const key = `${holiday.id || holiday.HOLIDAY_ID || index}-${holiday.title || holiday.HOLIDAY_DAY_NAME}-${holiday.date || holiday.DATE}`;
        return (
          <HolidayCard
            key={key}
            holiday={holiday}
            onDelete={() => onDelete?.(holiday.id || holiday.HOLIDAY_ID)}
          />
        );
      })}
    </div>
  );
};

export default HolidayList;
