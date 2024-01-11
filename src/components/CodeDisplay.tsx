import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAppSelector } from "../hooks/redux";
import { useTheme } from "./theme-provider";

interface CodeProps {
  code: string;
  language: string;
  //   highlight: number[];
}

export function CodeDisplay({ code, language }: CodeProps) {
  const { sidebarWidth } = useAppSelector((store) => store.settings);
  const { theme } = useTheme();
  return (
    <div
      style={{
        padding: "0px",
        display: "flex",
        maxWidth: sidebarWidth - 2,
        overflow: "hidden",
      }}
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
  );
}
