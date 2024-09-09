import { HelpCircle, Gauge } from "lucide-react";
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

export const WriteUpButtons = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);
  const { selectedProblem } = useAppSelector((store) => store.settings);
  const renderRuntime = () => {
    switch (selectedProblem) {
      case "fibonacci":
        switch (activeButton) {
          case ActivButton.recursiveTree:
            return <InlineMath math="O(2^n)" />;
          case ActivButton.topDownMemo:
            return <InlineMath math="O(n)" />;
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
            return <InlineMath math="O(n \cdot m)" />;
          case ActivButton.bottomUp:
            return <InlineMath math="O(n \cdot m)" />;
          default:
            return <p></p>;
        }
      case "gridTraveler":
        switch (activeButton) {
          case ActivButton.recursiveTree:
            return <InlineMath math="O(2^{m+n})" />;
          case ActivButton.topDownMemo:
            return <InlineMath math="O(m \cdot n)" />;
          case ActivButton.bottomUp:
            return <InlineMath math="O(m \cdot n)" />;
          default:
            return <p></p>;
        }
      default:
        return <p></p>;
    }
  };

  return (
    <div className="absolute bottom-1 right-2 z-30 tour-8">
      <div>
        <HoverCard openDelay={1}>
          <HoverCardTrigger asChild>
            <Button variant="secondary" size="sm">
              <Gauge />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit h-10 text-center flex justify-center items-center">
            {renderRuntime()}
          </HoverCardContent>
        </HoverCard>

        <TooltipProvider delayDuration={200} skipDelayDuration={1} key={1}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm">
                <HelpCircle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Erklärung anzeigen</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
