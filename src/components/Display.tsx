import { Tree } from "./Tree";
import { Grid } from "./Grid";
import { useAppSelector } from "../hooks/redux";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { Card } from "./ui/card";
import { WriteUpButtons } from "./WriteUpButtons";

export const Display = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);
  const { selectedProblem } = useAppSelector((store) => store.settings);
  return (
    <div className="relative">
      {activeButton !== ActivButton.problem ? <WriteUpButtons /> : null}
      <Card className=" px-2 mx-2 my-2 min-h-[calc(100vh-78px)]">
        {activeButton === ActivButton.bottomUp ? (
          <Grid />
        ) : selectedProblem ? (
          <Tree />
        ) : (
          <h1 className="text-xl flex justify-center items-center min-h-[calc(100vh-78px)]">
            Bitte wähle ein Problem aus dem Dropdown-Menü, um zu starten.
          </h1>
        )}
      </Card>
    </div>
  );
};
