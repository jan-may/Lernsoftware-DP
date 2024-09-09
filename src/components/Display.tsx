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
  const { selectedProblem, travelersInput } = useAppSelector(
    (store) => store.settings
  );

  const ProblemSwitcher = () => {
    switch (selectedProblem) {
      case "fibonacci":
        return (
          <Card className="px-2 mx-2 my-2 min-h-[calc(100vh-71px)]">
            {activeButton === ActivButton.bottomUp ? <Grid /> : <Tree />}
          </Card>
        );
      case "gridTraveler":
        return activeButton === ActivButton.problem ? (
          <Card className="mx-2 px-2">
            <Problem />
          </Card>
        ) : (
          <Card className="px-2 mx-2 min-h-[calc(100vh-71px)]">
            <div className="p-4">
              {!travelersInput.array.length && <h1>Loading...</h1>}
              {activeButton === ActivButton.recursiveTree && (
                <GridTravelerVisualizer gridData={travelersInput.array} />
              )}
              {activeButton === ActivButton.topDownMemo && (
                <GridTravelerMemoVisualizer gridData={travelersInput.array} />
              )}
              {activeButton === ActivButton.bottomUp && (
                <GridTravelerDPVisualizer gridData={travelersInput.array} />
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
          <Card className="px-2 mx-2 my-2 min-h-[calc(100vh-71px)]">
            {activeButton === ActivButton.recursiveTree && <Tree2 />}
            {activeButton === ActivButton.topDownMemo && <Tree2 />}
            {activeButton === ActivButton.bottomUp && (
              <CanSumTabulatedVisualizer targetSum={12} numbers={[2, 5]} />
            )}
          </Card>
        );
      default:
        return (
          <h1 className="ml-2">
            Bitte wähle ein Problem aus dem Dropdown-Menü, um zu starten.
          </h1>
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
