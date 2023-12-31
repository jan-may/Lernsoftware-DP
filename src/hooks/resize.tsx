import { useState, useEffect } from "react";

// Define the type for the dimensions
type DimensionsType = {
  horizontalSpacing: number;
  verticalSpacing: number;
  circleRadius: number;
};

// Custom hook to calculate and update dimensions on window resize
export const useResizeDimensions = (
  maxDepth: number,
  maxWidth: number
): DimensionsType => {
  // Initial calculation for dimensions
  const calculateDimensions = (): DimensionsType => {
    const horizontalSpacing = Math.min(
      (window.innerWidth - 300) / (maxDepth + 1),
      180
    );
    const verticalSpacing = (window.innerWidth - 400) / (maxWidth + 1);
    const circleRadius = Math.min(
      Math.min(horizontalSpacing, verticalSpacing) / 2,
      16
    );

    return {
      horizontalSpacing,
      verticalSpacing,
      circleRadius,
    };
  };

  // State to keep track of dimensions
  const [dimensions, setDimensions] = useState<DimensionsType>(
    calculateDimensions()
  );

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setDimensions(calculateDimensions());
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [maxDepth, maxWidth]); // Only re-run the effect if these values change

  return dimensions;
};
