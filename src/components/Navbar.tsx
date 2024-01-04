import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setActive, ActivButton } from "../feautures/navbar/navbarSlice";

export function Navbar() {
  const dispatch = useAppDispatch();
  const { activeButton } = useAppSelector((store) => store.navbar);

  const handleClick = (buttonName: ActivButton) => {
    dispatch(setActive(buttonName));
  };

  return (
    <nav>
      <button
        onClick={() => handleClick(ActivButton.problem)}
        className={activeButton === ActivButton.problem ? "active" : ""}
      >
        Problem
      </button>
      <button
        onClick={() => handleClick(ActivButton.recursiveTree)}
        className={activeButton === ActivButton.recursiveTree ? "active" : ""}
      >
        Top Down (recursive tree)
      </button>
      <button
        onClick={() => handleClick(ActivButton.topDownMemo)}
        className={activeButton === ActivButton.topDownMemo ? "active" : ""}
      >
        Top Dowm Memo
      </button>
      <button
        onClick={() => handleClick(ActivButton.bottomUp)}
        className={activeButton === ActivButton.bottomUp ? "active" : ""}
      >
        Bottom Up
      </button>
    </nav>
  );
}
