import { Tree } from "./Tree";
import { Grid } from "./Grid";
import { useAppSelector } from "../hooks/redux";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { Card } from "./ui/card";

export const Display = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);
  return (
    <div className="display-container">
      <Card className="p-2 m-2 max-h-[calc(100vh-86px)]">
        {activeButton === ActivButton.bottomUp ? <Grid /> : <Tree />}
      </Card>
    </div>
  );
};
