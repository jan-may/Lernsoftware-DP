import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setActive, ActivButton } from "../feautures/navbar/navbarSlice";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Faq } from "./Faq";
import { Card } from "./ui/card";
import { setFunctionName } from "../feautures/settings/settingsSlice";

export function Navbar() {
  const dispatch = useAppDispatch();
  const { activeButton } = useAppSelector((store) => store.navbar);
  const { selectedProblem } = useAppSelector((store) => store.settings);

  const handleClick = (buttonName: ActivButton) => {
    dispatch(setActive(buttonName));
    if (selectedProblem === "fibonacci") {
      if (buttonName === ActivButton.recursiveTree) {
        dispatch(setFunctionName("fib"));
      } else if (buttonName === ActivButton.topDownMemo) {
        dispatch(setFunctionName("fibMemo"));
      } else if (buttonName === ActivButton.bottomUp) {
        dispatch(setFunctionName("fibTab"));
      }
    }
  };

  const commonClasses = "hover:bg-primary hover:text-primary-foreground";
  const activeClasses = "bg-primary text-primary-foreground";

  return (
    <>
      <Card className="m-2 px-0 sticky top-0 z-50 ">
        <nav className="flex justify-between items-center">
          <div className="flex">
            {selectedProblem ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleClick(ActivButton.problem)}
                  className={`${commonClasses}  ${
                    activeButton === ActivButton.problem ? activeClasses : ""
                  }`}
                >
                  Problem
                </Button>
                <div className="tour-5">
                  <Button
                    variant="outline"
                    onClick={() => handleClick(ActivButton.recursiveTree)}
                    className={`${commonClasses}  ${
                      activeButton === ActivButton.recursiveTree
                        ? activeClasses
                        : ""
                    }`}
                  >
                    Top Down (Rekursion)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleClick(ActivButton.topDownMemo)}
                    className={`${commonClasses}  ${
                      activeButton === ActivButton.topDownMemo
                        ? activeClasses
                        : ""
                    }`}
                  >
                    Top Down Memo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleClick(ActivButton.bottomUp)}
                    className={`${commonClasses}  ${
                      activeButton === ActivButton.bottomUp ? activeClasses : ""
                    }`}
                  >
                    Bottom Up
                  </Button>
                </div>
              </>
            ) : null}
          </div>
          <div>
            <Faq />
            <ModeToggle />
          </div>
        </nav>
      </Card>
    </>
  );
}
