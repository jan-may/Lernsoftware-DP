import { useState } from "react";

export function ButtonGroupElem() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <button
        onClick={() => handleClick("recursiveTree")}
        className={activeButton === "recursiveTree" ? "active" : ""}
      >
        Recursive Tree
      </button>
      <button
        onClick={() => handleClick("bottomUpMemo")}
        className={activeButton === "bottomUpMemo" ? "active" : ""}
      >
        Bottom Up Memo
      </button>
      <button
        onClick={() => handleClick("topDown")}
        className={activeButton === "topDown" ? "active" : ""}
      >
        Top Down
      </button>
    </div>
  );
}
