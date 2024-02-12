import { Button } from "./ui/button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setShowCompilerInfo } from "../feautures/editor/editorSlice";

interface BtnProps {
  disabled: boolean;
}

export const CompilerInfoBtn = ({ disabled }: BtnProps) => {
  const dispatch = useAppDispatch();
  const { showCompilerInfo } = useAppSelector((store) => store.editor);

  const handleClick = () => {
    dispatch(setShowCompilerInfo(!showCompilerInfo));
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="absolute bottom-1 right-1 h-7"
            disabled={disabled}
            onClick={handleClick}
          >
            <Info size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Compiler Output anzeigen</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
