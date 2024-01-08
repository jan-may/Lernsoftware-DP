import { Tree } from "./Tree";
import { Grid } from "./Grid";
import { useAppSelector } from "../hooks/redux";
import { ActivButton } from "../feautures/navbar/navbarSlice";

export const Display = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);
  return (
    <div className="display-container">
      {activeButton === ActivButton.bottomUp ? <Grid /> : <Tree />}
      <Tree />
    </div>
  );
};
