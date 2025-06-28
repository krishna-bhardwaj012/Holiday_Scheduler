const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3500/api";

// ✅ Fetch holidays from the main (regular) list
export async function getHOLIDAY_DAYS_LIST() {
  try {
    const res = await fetch(`${baseUrl}/holiday_days_list`);
    if (!res.ok) throw new Error("Failed to fetch regular holidays");
    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching regular holidays:", error);
    return [];
  }
}

// ✅ Fetch user-submitted special holidays
export async function getSpecialHolidays() {
  try {
    const res = await fetch(`${baseUrl}/special_user_holiday`);
    if (!res.ok) throw new Error("Failed to fetch special holidays");
    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching special holidays:", error);
    return [];
  }
}

// ✅ Add a new user-submitted holiday
export async function addSpecialHoliday(holidayData) {
  try {
    const res = await fetch(`${baseUrl}/special_user_holiday`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(holidayData),
    });
    if (!res.ok) throw new Error("Failed to add special holiday");
    return await res.json();
  } catch (error) {
    console.error("❌ Error adding special holiday:", error);
    throw error;
  }
}

// ✅ Fetch holidays from external API (Calendarific)
export async function getExternalHolidays(country, year) {
  try {
    const res = await fetch(`${baseUrl}/external-holidays?country=${country}&year=${year}`);
    if (!res.ok) throw new Error("Failed to fetch external holidays");
    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching external holidays:", error);
    return [];
  }
}
