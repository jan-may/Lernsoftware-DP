import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { invoke } from "@tauri-apps/api/core";

export const PathDeleteBtn = () => {
  const handleClick = () => {
    try {
      invoke("delete_dotnet_project").then((res: any) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="right-1 h-7"
            onClick={handleClick}
          >
            <Trash2 size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Erstelltes .NET Pojekt löschen? Erneutes Ausführen des Codes
            erstellt ein neues Projekt.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
