import { Grid } from "./Grid";
import { useAppSelector } from "../hooks/redux";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { Card } from "./ui/card";
import { WriteUpButtons } from "./WriteUpButtons";
import GridTravelerVisualizer from "./Problems/GridTraveler/GridTravelerVisualizer";
import GridTravelerDPVisualizer from "./Problems/GridTraveler/GridTravelerDPVisualizer";
import { Problem } from "./Problem";
import GridTravelerMemoVisualizer from "./Problems/GridTraveler/GridTravelerMemoVisualizer";
import { Tree } from "./Tree";
import { Tree2 } from "./Tree2";
import CanSumTabulatedVisualizer from "./Problems/CanSum/CanSumTabulatedVisualizer";

export const Display = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);
  const { selectedProblem } = useAppSelector((store) => store.settings);

  const predefinedGrid = [
    [1, 3, 1, 3, 2],
    [1, 5, 1, 3, 2],
    [4, 2, 1, 2, 2],
    [4, 2, 1, 2, 2],
    [4, 2, 1, 2, 2],
  ];

  const ProblemSwitcher = () => {
    switch (selectedProblem) {
      case "fibonacci":
        return (
          <Card className="px-2 mx-2 my-2 min-h-[calc(100vh-78px)]">
            {activeButton === ActivButton.bottomUp ? <Grid /> : <Tree />}
          </Card>
        );
      case "gridTraveler":
        return activeButton === ActivButton.problem ? (
          <Card className="mx-2 px-2">
            <Problem />
          </Card>
        ) : (
          <Card className="px-2 mx-2 min-h-[calc(100vh-78px)]">
            <div className="p-4">
              {activeButton === ActivButton.recursiveTree && (
                <GridTravelerVisualizer gridData={predefinedGrid} />
              )}
              {activeButton === ActivButton.topDownMemo && (
                <GridTravelerMemoVisualizer gridData={predefinedGrid} />
              )}
              {activeButton === ActivButton.bottomUp && (
                <GridTravelerDPVisualizer gridData={predefinedGrid} />
              )}
            </div>
          </Card>
        );
      case "canSum":
        return activeButton === ActivButton.problem ? (
          <Card className="mx-2 px-2">
            <Problem />
          </Card>
        ) : (
          <Card className="px-2 mx-2 min-h-[calc(100vh-78px)]">
            <div className="p-4">
              {activeButton === ActivButton.recursiveTree && <Tree2 />}
              {activeButton === ActivButton.topDownMemo && <Tree2 />}
              {activeButton === ActivButton.bottomUp && (
                <CanSumTabulatedVisualizer targetSum={12} numbers={[2, 5]} />
              )}
            </div>
          </Card>
        );
      default:
        return (
          <h1>Bitte wähle ein Problem aus dem Dropdown-Menü, um zu starten.</h1>
        );
    }
  };

  return (
    <div className="relative tour-6">
      {activeButton !== ActivButton.problem && <WriteUpButtons />}
      <ProblemSwitcher />
    </div>
  );
};
