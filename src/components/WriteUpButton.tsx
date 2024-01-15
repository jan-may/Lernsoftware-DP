import { HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

export const WriteUpButton = () => {
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" className="absolute bottom-1 right-2">
            <HelpCircle />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Erklärung anzeigen</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
