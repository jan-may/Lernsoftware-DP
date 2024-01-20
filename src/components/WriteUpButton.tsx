import { HelpCircle, Gauge } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

const Buttons = [
  {
    icon: <Gauge />,
    text: "Laufzeitanalyse anzeigen",
  },
  {
    icon: <HelpCircle />,
    text: "Erklärung anzeigen",
  },
];

export const WriteUpButton = () => {
  return (
    <div className="absolute bottom-1 right-2">
      {Buttons.map((button: any) => (
        <TooltipProvider delayDuration={250} key={button.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm">
                {button.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{button.text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
