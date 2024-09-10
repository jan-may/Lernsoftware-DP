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
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";

const checkArrayIntegrity = (array: number[][]) => {
  return array.every((row) => row.length === array[0].length);
};

export const Display = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);
  const { selectedProblem, travelersInput, targetNumber, numbers } =
    useAppSelector((store) => store.settings);
  const { toast } = useToast();

  useEffect(() => {
    if (
      selectedProblem === "gridTraveler" &&
      !checkArrayIntegrity(travelersInput.array)
    ) {
      toast({
        title: "Ungültiges Grid",
        description: "Bitte geben Sie ein symmetrisches Grid ein.",
        variant: "destructive",
      });
    }
  }, [travelersInput.array]);

  const ProblemSwitcher = () => {
    if (
      selectedProblem === "gridTraveler" &&
      !checkArrayIntegrity(travelersInput.array)
    ) {
      return (
        <Card className="px-2 mx-2 my-2 min-h-[calc(100vh-71px)]">
          <h1 className="ml-2">
            Bitte geben Sie ein symmetrisches Grid ein, um zu starten.
          </h1>
        </Card>
      );
    }

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
              {travelersInput.array.length ? (
                activeButton === ActivButton.recursiveTree && (
                  <GridTravelerVisualizer gridData={travelersInput.array} />
                )
              ) : (
                <h1 className="ml-2">
                  Bitte geben Sie ein gültiges Grid ein, um zu starten.
                </h1>
              )}
              {travelersInput.array.length ? (
                activeButton === ActivButton.topDownMemo && (
                  <GridTravelerMemoVisualizer gridData={travelersInput.array} />
                )
              ) : (
                <h1 className="ml-2">
                  Bitte geben Sie ein gültiges Grid ein, um zu starten.
                </h1>
              )}
              {travelersInput.array.length ? (
                activeButton === ActivButton.bottomUp && (
                  <GridTravelerDPVisualizer gridData={travelersInput.array} />
                )
              ) : (
                <h1 className="ml-2">
                  Bitte geben Sie ein gültiges Grid ein, um zu starten.
                </h1>
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
              <CanSumTabulatedVisualizer
                targetSum={targetNumber}
                numbers={numbers}
              />
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
