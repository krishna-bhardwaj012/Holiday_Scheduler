// src/components/ui/Select.jsx
import React from "react";

export const Select = ({ children, onValueChange, defaultValue }) => {
  return (
    <select
      onChange={(e) => onValueChange(e.target.value)}
      defaultValue={defaultValue}
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children }) => <>{children}</>;

export const SelectValue = ({ placeholder }) => (
  <option value="" disabled>
    {placeholder}
  </option>
);

export const SelectContent = ({ children }) => <>{children}</>;

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
