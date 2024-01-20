import { Tree } from "./Tree";
import { Grid } from "./Grid";
import { useAppSelector } from "../hooks/redux";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { Card } from "./ui/card";
import { WriteUpButton } from "./WriteUpButton";

export const Display = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);
  const { selectedProblem } = useAppSelector((store) => store.settings);
  return (
    <div className="relative">
      <WriteUpButton />
      <Card className="p-2 m-2 max-h-[calc(100vh-78px)]">
        {activeButton === ActivButton.bottomUp ? (
          <Grid />
        ) : selectedProblem ? (
          <Tree />
        ) : (
          <h1 className="text-xl flex justify-center items-center h-screen">
            Bitte wähle ein Problem aus dem Dropdown, um zu starten.
          </h1>
        )}
      </Card>
    </div>
  );
};
