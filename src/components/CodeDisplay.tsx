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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger>
          <div
            style={{
              padding: "0px",
              display: "flex",
              maxWidth: sidebarWidth - 2,
              minWidth: sidebarWidth - 2,
              overflow: "hidden",
            }}
            className={bluredCode ? "blur fadeIn" : "fadeIn"}
            onClick={handleCodeBlur}
          >
            <div
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
          {bluredCode ? (
            <TooltipContent side="right">
              <p>Code anzeigen</p>
            </TooltipContent>
          ) : null}
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}
