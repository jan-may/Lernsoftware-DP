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
import { useEffect, useState, useRef } from "react";
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
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

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

  // Check for overflow and update the isOverflowing state
  useEffect(() => {
    const checkOverflow = () => {
      if (sidebarRef.current) {
        const { scrollHeight, clientHeight } = sidebarRef.current;
        setIsOverflowing(scrollHeight > clientHeight);
      }
    };

    checkOverflow(); // Initial check for overflow
    window.addEventListener("resize", checkOverflow); // Check on resize

    return () => window.removeEventListener("resize", checkOverflow);
  }, [selectedProblem, activeButton]);

  useEffect(() => {
    activeButton === ActivButton.problem
      ? dispatch(setBluredCode(false))
      : dispatch(setBluredCode(true));
  }, [activeButton, dispatch]);

  return (
    <Card
      ref={sidebarRef}
      className="p-2 m-2 left-0 top-0 fixed h-[99vh] tour-7 overflow-y-auto"
    >
      <div style={{ minHeight: "calc(100vh - 37px)" }}>
        <CodeSelect />
        <CodeDisplay code={codeMap[activeButton] || ""} language="cs" />
        <SettingsForm isOverflowing={isOverflowing} />
        <div style={{ marginTop: "30px" }}></div>
      </div>
    </Card>
  );
};
