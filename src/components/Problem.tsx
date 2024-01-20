import { DownloadBtn } from "./Download";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "./theme-provider";
import { FibTable } from "./FibTable";

const code = `public class FibonacciCalculator
{
    public int Fib(int n) {} //recursive
    public int FibMemo(int n, int[] memo){} //top-down with memoization
    public int FibTab(int n) {} //bottom-up with tabulation
}`;

export const Problem = () => {
  const { theme } = useTheme();
  return (
    <div style={{ minHeight: "calc(100vh - 54px)", maxHeight: "100vh" }}>
      <p>Die Fibonacci-Folge ist rekursiv wie folgt definiert:</p>
      <div className="my-10 w-32">
        <BlockMath
          math="F(n) = 
\begin{cases} 
0 & \text{if } n = 0 \\
1 & \text{if } n = 1 \\
F(n-1) + F(n-2) & \text{if } n > 1 
\end{cases}"
        />
      </div>
      <FibTable />
      <h1 className="text-lg mb-2">Bedingung für dynamische Programmierung:</h1>
      <p className="mb-1">
        <span className="mr-4 ">Optimale Teilstruktur:</span>
        <InlineMath math=" F(n-1)" /> und <InlineMath math="F(n-2)" />
      </p>
      <p>
        <span className="mr-4">Überlappende Teilprobleme:</span>
        <InlineMath math="F(n) = F(n-1) + F(n-2)" />
      </p>
      <h1 className="text-lg mb-2 mt-8">Aufgabe:</h1>
      <p className="mb-1">
        Implementiere folgende Methoden der Klasse{" "}
        <code>FibonacciCalculator</code>:
      </p>
      <div style={{ fontSize: "14px", maxWidth: "650px" }}>
        <SyntaxHighlighter
          language={"cs"}
          style={theme === "light" ? oneLight : oneDark}
          wrapLines
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <DownloadBtn />
    </div>
  );
};
