import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface NumberArrayFieldProps {
  name: string;
  label: string;
  defaultValue: number[];
  onChange: (value: number[]) => void;
}

const NumberArrayField: React.FC<NumberArrayFieldProps> = ({
  name,
  label,
  defaultValue,
  onChange,
}) => {
  const [arrayInput, setArrayInput] = useState<string>("");

  // Initialize input field with default value (converts the array into a comma-separated string)
  useEffect(() => {
    const formattedArray = defaultValue.join(", ");
    setArrayInput(formattedArray);
  }, [defaultValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArrayInput(e.target.value);
  };

  const handleSubmit = () => {
    // Convert the input string back into a 1D array of numbers
    const array = arrayInput
      .split(",")
      .map((num) => num.trim()) // Remove extra spaces
      .map((num) => parseFloat(num)) // Convert to number
      .filter((num) => !isNaN(num)); // Filter out invalid numbers

    onChange(array); // Pass the validated 1D array of numbers back to the parent component
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={arrayInput}
        onChange={handleInputChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        rows={1}
        placeholder="Geben Sie die Array-Werte ein, getrennt durch Kommata. Bsp.: 1,2,3,4"
      />
      <Button
        type="button"
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 w-15 h-7 text-white rounded"
      >
        save
      </Button>
    </div>
  );
};

export default NumberArrayField;
