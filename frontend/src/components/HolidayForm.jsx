import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const HolidayForm = ({  selectedCategory }) => {
  const {
    
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      declaredBy: "",
      type: "",
      region: "",
      type_1: "",
      level: "",
      country: "",
      category: selectedCategory || "special",
    },
  });

  // Keep category synced with active tab
  useEffect(() => {
    if (selectedCategory) {
      setValue("category", selectedCategory);
    }
  }, [selectedCategory, setValue]);

  
  };

  


export default HolidayForm;
