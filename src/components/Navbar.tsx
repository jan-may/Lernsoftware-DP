import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setActive } from "../feautures/navbar/navbarSlice";

export function Navbar() {
  const dispatch = useAppDispatch();
  const { active } = useAppSelector((store) => store.navbar);

  const handleClick = (buttonName: string) => {
    dispatch(setActive(buttonName));
  };

  return (
    <nav>
      <button
        onClick={() => handleClick("problem")}
        className={active === "problem" ? "active" : ""}
      >
        Problem
      </button>
      <button
        onClick={() => handleClick("recursiveTree")}
        className={active === "recursiveTree" ? "active" : ""}
      >
        Top Down (recursive tree)
      </button>
      <button
        onClick={() => handleClick("topDownMemo")}
        className={active === "topDownMemo" ? "active" : ""}
      >
        Top Dowm Memo
      </button>
      <button
        onClick={() => handleClick("bottomUp")}
        className={active === "bottomUp" ? "active" : ""}
      >
        Bottom Up
      </button>
    </nav>
  );
}
