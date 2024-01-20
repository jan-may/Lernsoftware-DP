import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAppSelector } from "../hooks/redux";
import { useTheme } from "./theme-provider";
import { useDispatch } from "react-redux";
import { setBluredCode } from "../feautures/settings/settingsSlice";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { ClipboardBtn } from "./ClipboardBtn";

interface CodeProps {
  code: string;
  language: string;
}

export function CodeDisplay({ code, language }: CodeProps) {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { sidebarWidth, bluredCode } = useAppSelector(
    (store) => store.settings
  );
  const { activeButton } = useAppSelector((store) => store.navbar);

  const handleCodeBlur = () => {
    if (activeButton !== ActivButton.problem) {
      dispatch(setBluredCode(!bluredCode));
    }
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "0px",
        display: "flex",
        maxWidth: sidebarWidth - 2,
        minWidth: sidebarWidth - 2,
        overflow: "hidden",
        cursor: bluredCode ? "pointer" : "text",
      }}
    >
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant={"outline"}
              className={
                bluredCode
                  ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  : "hidden"
              }
              onClick={handleCodeBlur}
            >
              <Eye />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={190} align="center">
            <p>Code anzeigen</p>
          </TooltipContent>
        </Tooltip>
        {activeButton !== ActivButton.problem && (
          <Tooltip>
            <TooltipTrigger>
              <ClipboardBtn code={code} bluredCode={bluredCode} />
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={320} align="start">
              <p>Code kopieren</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>

      <div
        className={bluredCode ? "blur fadeIn" : "fadeIn"}
        onClick={handleCodeBlur}
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "column",
          fontSize: "13px",
          padding: "0px",
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={theme === "light" ? oneLight : oneDark}
          wrapLines
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
