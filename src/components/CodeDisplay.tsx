import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yDark,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAppSelector } from "../hooks/redux";

interface CodeProps {
  code: string;
  language: string;
  //   highlight: number[];
}

export function CodeDisplay({ code, language }: CodeProps) {
  const { sidebarWidth } = useAppSelector((store) => store.settings);
  return (
    <div style={{ padding: "0px", display: "flex", width: sidebarWidth + 30 }}>
      <div
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "column",
          fontSize: "16px",
          padding: "0px",
        }}
      >
        <SyntaxHighlighter language={language} style={atomDark}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
