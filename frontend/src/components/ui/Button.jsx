import React from 'react';

export const Button = ({ children, ...props }) => {
  return (
    <button {...props} className="btn-primary">
      {children}
    </button>
  );
};
