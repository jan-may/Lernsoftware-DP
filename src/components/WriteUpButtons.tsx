import { Gauge } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import "katex/dist/katex.min.css";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { useAppSelector } from "../hooks/redux";
import { InlineMath } from "react-katex";
import FibExplain from "./Problems/Fib/FibExplain";
import FibTabExplain from "./Problems/Fib/FibTabExplain";
import FibMemoExplain from "./Problems/Fib/FibMemoExplain";
import CanSumRecExplain from "./Problems/CanSum/CanSumRecExplain";
import CanSumMemoExplain from "./Problems/CanSum/CanSumMemoExplain";
import CanSumTabExplain from "./Problems/CanSum/CanSumTabExplain";
import GridTravelerExplain from "./Problems/GridTraveler/GridTravelerExplain";
import GridTravelerMemoExplain from "./Problems/GridTraveler/GridTravelerMemoExplain";
import GridTravelerDPExplain from "./Problems/GridTraveler/GridTravelerDPExplain";

export const WriteUpButtons = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);
  const { selectedProblem } = useAppSelector((store) => store.settings);

  // Function to render runtime complexity based on selected problem and active button
  const renderRuntime = () => {
    switch (selectedProblem) {
      case "fibonacci":
        switch (activeButton) {
          case ActivButton.recursiveTree:
            return <InlineMath math="O(2^n)" />;
          case ActivButton.topDownMemo:
          case ActivButton.bottomUp:
            return <InlineMath math="O(n)" />;
          default:
            return <p></p>;
        }
      case "canSum":
        switch (activeButton) {
          case ActivButton.recursiveTree:
            return <InlineMath math="O(n^m)" />;
          case ActivButton.topDownMemo:
          case ActivButton.bottomUp:
            return <InlineMath math="O(n \cdot m)" />;
          default:
            return <p></p>;
        }
      case "gridTraveler":
        switch (activeButton) {
          case ActivButton.recursiveTree:
            return <InlineMath math="O(2^{n+m})" />;
          case ActivButton.topDownMemo:
          case ActivButton.bottomUp:
            return <InlineMath math="O(n \cdot m)" />;
          default:
            return <p></p>;
        }
      default:
        return <p></p>;
    }
  };

  // Function to render explanation based on selected problem and active button
  const renderExplanation = () => {
    switch (selectedProblem) {
      case "fibonacci":
        switch (activeButton) {
          case ActivButton.recursiveTree:
            return <FibExplain />;
          case ActivButton.topDownMemo:
            return <FibMemoExplain />;
          case ActivButton.bottomUp:
            return <FibTabExplain />;
          default:
            return <p></p>;
        }
      case "canSum":
        switch (activeButton) {
          case ActivButton.recursiveTree:
            return <CanSumRecExplain />;
          case ActivButton.topDownMemo:
            return <CanSumMemoExplain />;
          case ActivButton.bottomUp:
            return <CanSumTabExplain />;
          default:
            return <p></p>;
        }
      case "gridTraveler":
        switch (activeButton) {
          case ActivButton.recursiveTree:
            return <GridTravelerExplain />;
          case ActivButton.topDownMemo:
            return <GridTravelerMemoExplain />;
          case ActivButton.bottomUp:
            return <GridTravelerDPExplain />;
          default:
            return <p></p>;
        }
      default:
        return <p></p>;
    }
  };

  return (
    <div className="absolute bottom-1 right-2 z-30 tour-8">
      <div className="flex space-x-1">
        {/* Gauge Button with HoverCard */}
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Button variant="secondary" size="sm">
              <Gauge />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit h-10 text-center flex justify-center items-center p-2">
            {renderRuntime()}
          </HoverCardContent>
        </HoverCard>

        {/* Tooltip and Dialog for HelpCircle Button */}
        <TooltipProvider delayDuration={200} skipDelayDuration={1}>
          <Tooltip>
            <TooltipTrigger asChild>{renderExplanation()}</TooltipTrigger>
            <TooltipContent className="bg-muted text-sm">
              <p>Erklärung anzeigen</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
