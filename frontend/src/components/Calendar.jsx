import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarWidget = () => {
  return (
    <div className="calendar-widget">
      <h3>Calendar</h3>
      <Calendar />
    </div>
  );
};

export default CalendarWidget;
