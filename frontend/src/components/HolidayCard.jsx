import React from "react";
import "./HolidayCard.css";

const HolidayCard = ({ holiday, onDelete }) => {
  if (!holiday || typeof holiday !== "object") return null;

  const {
    id,
    HOLIDAY_ID,
    HOLIDAY_NAME,
    HOLIDAY_DAY_NAME,
    title,
    name,
    description,
    DATE,
    date,
    category,
    STATUS,
    COUNTRY,
    REGION,
    TYPE,
    SUBTYPE,
    CATEGORY,
    tags = [],
  } = holiday;

  const displayTitle = title || HOLIDAY_DAY_NAME || HOLIDAY_NAME || name || "Special Holiday";
  const displayDate = date || DATE || new Date().toISOString();
  const displayCategory = category || STATUS || CATEGORY || "General";

  const parsedDate = new Date(displayDate);
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const day = parsedDate.getDate();
  const month = parsedDate.toLocaleString("en-US", { month: "short" });
  const year = parsedDate.getFullYear();

  return (
    <div className="holiday-card">
      <div className="holiday-date">
        <div className="day">{day}</div>
        <div className="month-year">
          <div>{month}</div>
          <div>{year}</div>
        </div>
      </div>

      <div className="holiday-info">
        <h3>{displayTitle}</h3>
        {description && <p>{description}</p>}
        <p className="formatted-date">📅 {formattedDate}</p>

        {COUNTRY && <p><strong>🌍 Country:</strong> {COUNTRY}</p>}
        {REGION && <p><strong>📍 Region:</strong> {REGION}</p>}
        {TYPE && <p><strong>🏷️ Type:</strong> {TYPE}</p>}
        {SUBTYPE && <p><strong>🔖 Subtype:</strong> {SUBTYPE}</p>}
        {CATEGORY && !tags.includes(CATEGORY) && <p><strong>📂 Category:</strong> {CATEGORY}</p>}

        <div className="tags">
          {[displayCategory, ...tags]
            .filter(Boolean)
            .map((tag, index) => {
              const safeTag = typeof tag === "string" ? tag : String(tag);
              return (
                <span className={`tag ${safeTag.toLowerCase()}`} key={`${safeTag}-${index}`}>
                  {safeTag}
                </span>
              );
            })}
        </div>
      </div>

      <button className="delete-btn" onClick={() => onDelete?.(id || HOLIDAY_ID)}>
        🗑️
      </button>
    </div>
  );
};

export default HolidayCard;
