import { FC } from "react";
import { InlineMath } from "react-katex";

export const CanSumDescription: FC = () => {
  return (
    <>
      Für <InlineMath math="F(5)" /> muss bspw. <InlineMath math="F(3)" /> zwei
      Mal berechnet werden.
    </>
  );
};
