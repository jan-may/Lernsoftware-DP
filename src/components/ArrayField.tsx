import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface ArrayFieldProps {
  name: string;
  label: string;
  defaultValue: number[][];
  onChange: (value: number[][]) => void;
}

const ArrayField: React.FC<ArrayFieldProps> = ({
  name,
  label,
  defaultValue,
  onChange,
}) => {
  const [arrayInput, setArrayInput] = useState<string>("");

  useEffect(() => {
    // Convert the 2D array of numbers into a string format for the text area
    const formattedArray = defaultValue.map((row) => row.join(", ")).join("\n");
    setArrayInput(formattedArray);
  }, [defaultValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setArrayInput(value);
  };

  const handleSubmit = () => {
    // Validate and convert the input string back into a 2D array of numbers
    const rows = arrayInput
      .split("\n")
      .map(
        (row) =>
          row
            .split(",")
            .map((cell) => {
              const trimmedCell = cell.trim();
              return trimmedCell === "" ? NaN : parseFloat(trimmedCell); // Handle empty values
            })
            .filter((cell) => !isNaN(cell)) // Remove NaN values
      )
      .filter((row) => row.length > 0);

    onChange(rows); // Pass the validated 2D array of numbers back to the parent component
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium ">
        {label}
      </label>
      <Textarea
        id={name}
        name={name}
        value={arrayInput}
        onChange={handleInputChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        rows={5}
        placeholder="Geben Sie die Array-Werte zeilenweise ein, getrennt durch Kommata. Bsp.:
1,2,3
4,5,6"
      />
      <Button
        type="button"
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 w-15 h-7 rounded"
      >
        save
      </Button>
    </div>
  );
};

export default ArrayField;
