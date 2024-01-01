import { useState } from "react";

export function Navbar() {
  const [activeButton, setActiveButton] = useState<string | null>(
    "recursiveTree"
  );

  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <nav>
      <button
        onClick={() => handleClick("problem")}
        className={activeButton === "problem" ? "active" : ""}
      >
        Problem
      </button>
      <button
        onClick={() => handleClick("recursiveTree")}
        className={activeButton === "recursiveTree" ? "active" : ""}
      >
        Top Down (recursive tree)
      </button>
      <button
        onClick={() => handleClick("topDownMemo")}
        className={activeButton === "topDownMemo" ? "active" : ""}
      >
        Top Dowm Memo
      </button>
      <button
        onClick={() => handleClick("bottomUp")}
        className={activeButton === "bottomUp" ? "active" : ""}
      >
        Bottom Up
      </button>
    </nav>
  );
}
