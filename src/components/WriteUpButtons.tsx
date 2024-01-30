import { HelpCircle, Gauge } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export const WriteUpButtons = () => {
  return (
    <div className="absolute bottom-1 right-2 z-30">
      <div>
        <HoverCard openDelay={1}>
          <HoverCardTrigger asChild>
            <Button variant="secondary" size="sm">
              <Gauge />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit h-10 text-center flex justify-center items-center">
            <InlineMath math={"\\mathcal{O}(n\\log{}n)"} />
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
