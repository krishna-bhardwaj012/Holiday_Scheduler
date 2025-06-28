import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPanel.css";

const CalendarPanel = () => {
  return (
    <div className="calendar-container">
      <h3>Calendar</h3>
      <Calendar />
    </div>
  );
};

export default CalendarPanel;
