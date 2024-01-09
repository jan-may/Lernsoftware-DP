import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setActive, ActivButton } from "../feautures/navbar/navbarSlice";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  const dispatch = useAppDispatch();
  const { activeButton } = useAppSelector((store) => store.navbar);

  const handleClick = (buttonName: ActivButton) => {
    dispatch(setActive(buttonName));
  };

  return (
    <>
      <nav className="flex space justify-between">
        <div>
          <Button
            variant="secondary"
            onClick={() => handleClick(ActivButton.problem)}
            className={
              activeButton === ActivButton.problem
                ? "bg-red-500 focus:bg-red-500"
                : ""
            }
          >
            Problem
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleClick(ActivButton.recursiveTree)}
            className={
              activeButton === ActivButton.recursiveTree ? "active" : ""
            }
          >
            Top Down (recursive tree)
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleClick(ActivButton.topDownMemo)}
            className={activeButton === ActivButton.topDownMemo ? "active" : ""}
          >
            Top Dowm Memo
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleClick(ActivButton.bottomUp)}
            className={activeButton === ActivButton.bottomUp ? "active" : ""}
          >
            Bottom Up
          </Button>
        </div>
        <ModeToggle />
      </nav>
      <Separator />
    </>
  );
}
