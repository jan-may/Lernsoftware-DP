import { SettingsForm } from "./SettingsForm";
import { CodeDisplay } from "./CodeDisplay";
import { CodeSelect } from "./CodeSelect";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { fibCode, fibMemoCode, fibTabCode } from "../trees/fibonacci";
import {
  gridTravelerCode,
  gridTravelerMemoCode,
  gridTravelerTabCode,
} from "../components/Problems/GridTraveler/Traveler";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setBluredCode } from "../feautures/settings/settingsSlice";

import { Card } from "./ui/card";
import { useEffect } from "react";
import {
  canSumCode,
  canSumMemoCode,
  canSumTabCode,
} from "./Problems/CanSum/CanSum";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { activeButton } = useAppSelector((store) => store.navbar);
  const { selectedProblem } = useAppSelector((store) => store.settings);

  const noCode = `// no code to display`;

  // Create a dynamic map for code based on activeButton and selectedProblem
  const getCodeMap = () => {
    switch (selectedProblem) {
      case "fibonacci": // Problem 1
        return {
          [ActivButton.recursiveTree]: fibCode,
          [ActivButton.topDownMemo]: fibMemoCode,
          [ActivButton.bottomUp]: fibTabCode,
          [ActivButton.problem]: noCode,
        };
      case "gridTraveler":
        return {
          [ActivButton.recursiveTree]: gridTravelerCode,
          [ActivButton.topDownMemo]: gridTravelerMemoCode,
          [ActivButton.bottomUp]: gridTravelerTabCode,
          [ActivButton.problem]: noCode,
        };
      case "canSum":
        return {
          [ActivButton.recursiveTree]: canSumCode,
          [ActivButton.topDownMemo]: canSumMemoCode,
          [ActivButton.bottomUp]: canSumTabCode,
          [ActivButton.problem]: noCode,
        };
      default:
        return {
          [ActivButton.problem]: noCode,
        };
    }
  };

  const codeMap = getCodeMap();

  useEffect(() => {
    activeButton === ActivButton.problem
      ? dispatch(setBluredCode(false))
      : dispatch(setBluredCode(true));
  }, [activeButton, dispatch]);

  return (
    <Card className="p-2 m-2 fixed tour-7">
      <div style={{ minHeight: "calc(100vh - 37px)" }}>
        <CodeSelect />
        <CodeDisplay code={codeMap[activeButton] || ""} language="cs" />
        <SettingsForm />
        <div style={{ marginTop: "30px" }}></div>
      </div>
    </Card>
  );
};