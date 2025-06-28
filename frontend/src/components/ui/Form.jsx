import React from "react";
import { Controller } from "react-hook-form";

export const Form = ({ children, ...props }) => <form {...props}>{children}</form>;

export const FormControl = ({ children }) => <div className="form-control">{children}</div>;

// Declare FormField here without importing it!
export const FormField = ({ control, name, render }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => render({ field, fieldState, formState })}
    />
  );
};

export const FormItem = ({ children }) => <div className="form-item mb-4">{children}</div>;

export const FormLabel = ({ children }) => (
  <label className="block mb-1 font-semibold text-gray-700">{children}</label>
);

export const FormMessage = () => null;
